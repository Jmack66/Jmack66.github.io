import { search } from "@rpidanny/google-scholar";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetches publications from Google Scholar for a given author
 * @param {string} authorName - The author's name to search for
 * @param {Object} options - Search options
 * @returns {Array} Array of publication objects
 */
export async function fetchGoogleScholarPublications(authorName, options = {}) {
  try {
    const searchOpts = {
      keywords: `author:"${authorName}"`,
      yearLow: options.yearLow || 2020, // Default to papers from 2020 onwards
      yearHigh: options.yearHigh || new Date().getFullYear(),
      ...options,
    };

    console.log(`Fetching publications for ${authorName}...`);
    const results = await search(searchOpts);

    if (!results || !results.papers) {
      console.warn("No papers found in Google Scholar results");
      return [];
    }

    // Transform Google Scholar results to our publication format
    return results.papers.map((paper, index) => {
      // Handle authors - could be array of objects or string
      let authors = authorName; // fallback
      if (paper.authors) {
        if (Array.isArray(paper.authors)) {
          // Authors are objects with name property
          authors = paper.authors
            .map((author) =>
              typeof author === "object" && author.name ? author.name : author,
            )
            .join(", ");
        } else if (typeof paper.authors === "string") {
          authors = paper.authors;
        } else if (typeof paper.authors === "object") {
          // Sometimes authors might be an object with names
          authors = Object.values(paper.authors).join(", ") || authorName;
        }
      }

      // Handle journal/venue
      let journal = "Unknown Venue";
      if (paper.venue) {
        journal = paper.venue;
      } else if (paper.journal) {
        journal = paper.journal;
      } else if (paper.source) {
        // Source might be an object with type/url
        if (typeof paper.source === "object" && paper.source.url) {
          // Extract journal name from URL with better mapping
          const url = paper.source.url;
          if (url.includes("mdpi.com")) {
            journal = "MDPI Journal";
          } else if (url.includes("ieee.org")) {
            journal = "IEEE Publication";
          } else if (
            url.includes("springer.com") ||
            url.includes("link.springer.com")
          ) {
            journal = "Springer";
          } else if (
            url.includes("elsevier.com") ||
            url.includes("sciencedirect.com")
          ) {
            journal = "Elsevier";
          } else if (url.includes("nature.com")) {
            journal = "Nature";
          } else if (url.includes("arxiv.org")) {
            journal = "arXiv";
          } else {
            // Extract domain name as fallback
            const urlMatch = url.match(/\/\/(?:www\.)?([^\/]+)/);
            journal = urlMatch
              ? urlMatch[1].replace(/\.(com|org|edu|net)$/, "").toUpperCase()
              : "Online Publication";
          }
        } else if (typeof paper.source === "string") {
          journal = paper.source;
        }
      } else if (paper.publication) {
        journal = paper.publication;
      }

      // Handle year - extract from various possible formats
      let year = extractYearFromPaper(paper);

      // Clean up title - remove [HTML][HTML] and other prefixes
      let cleanTitle = paper.title || "Untitled";
      cleanTitle = cleanTitle.replace(/^\[HTML\]\[HTML\]\s*/, ""); // Remove [HTML][HTML] prefix
      cleanTitle = cleanTitle.replace(/^\[PDF\]\[PDF\]\s*/, ""); // Remove [PDF][PDF] prefix
      cleanTitle = cleanTitle.replace(/^\[CITATION\]\s*/, ""); // Remove [CITATION] prefix

      const transformed = {
        title: cleanTitle,
        authors: authors,
        journal: journal,
        year: year,
        volume: paper.volume || null,
        pages: paper.pages || null,
        doi:
          extractDoiFromUrl(paper.url) ||
          extractDoiFromUrl(paper.source?.url) ||
          null,
        link: paper.url || null,
        citationCount: paper.citationCount || 0,
        description: paper.description || null,
      };

      return transformed;
    });
  } catch (error) {
    console.error("Error fetching Google Scholar publications:", error);
    return [];
  }
}

/**
 * Fetches publications from ORCID API
 * @param {string} orcidId - The ORCID ID (e.g., "0000-0000-0000-0000")
 * @returns {Array} Array of publication objects
 */
export async function fetchORCIDPublications(orcidId) {
  try {
    const cleanOrcidId = orcidId.replace("https://orcid.org/", "");
    const apiUrl = `https://pub.orcid.org/v3.0/${cleanOrcidId}/works`;

    console.log(`Fetching publications from ORCID: ${cleanOrcidId}...`);

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`ORCID API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.group) {
      return [];
    }

    // Fetch detailed information for each work
    const publications = [];
    for (const group of data.group) {
      for (const workSummary of group["work-summary"]) {
        try {
          const workDetailUrl = `https://pub.orcid.org/v3.0/${cleanOrcidId}/work/${workSummary["put-code"]}`;
          const workResponse = await fetch(workDetailUrl, {
            headers: { Accept: "application/json" },
          });

          if (workResponse.ok) {
            const workDetail = await workResponse.json();
            const pub = transformORCIDWork(workDetail);
            if (pub) publications.push(pub);
          }
        } catch (workError) {
          console.warn("Error fetching work detail:", workError);
        }
      }
    }

    return publications;
  } catch (error) {
    console.error("Error fetching ORCID publications:", error);
    return [];
  }
}

/**
 * Transform ORCID work data to our publication format
 */
function transformORCIDWork(work) {
  try {
    const title = work.title?.title?.value || "Untitled";
    const journal = work["journal-title"]?.value || "Unknown Journal";
    const year =
      work["publication-date"]?.year?.value ||
      new Date().getFullYear().toString();

    // Extract authors from contributors
    let authors = "Unknown Author";
    if (work.contributors?.contributor) {
      const authorNames = work.contributors.contributor
        .map((contrib) => {
          const creditName = contrib["credit-name"]?.value;
          if (creditName) return creditName;
          return null;
        })
        .filter(Boolean);
      if (authorNames.length > 0) {
        authors = authorNames.join(", ");
      }
    }

    // Extract DOI
    let doi = null;
    let link = null;
    if (work["external-ids"]?.["external-id"]) {
      for (const extId of work["external-ids"]["external-id"]) {
        if (extId["external-id-type"] === "doi") {
          doi = extId["external-id-value"];
          link = `https://doi.org/${doi}`;
          break;
        }
      }
    }

    return {
      title,
      authors,
      journal,
      year,
      volume: null, // ORCID doesn't always have this
      pages: null, // ORCID doesn't always have this
      doi,
      link,
    };
  } catch (error) {
    console.warn("Error transforming ORCID work:", error);
    return null;
  }
}

/**
 * Extract DOI from URL if present
 */
function extractDoiFromUrl(url) {
  if (!url) return null;

  // More comprehensive DOI extraction
  const doiRegex = /10\.\d{4,}\/[^\s<>"']+/;
  let match = url.match(doiRegex);

  if (match) {
    // Clean up DOI by removing trailing punctuation
    let doi = match[0];
    doi = doi.replace(/[.,;:)}\]]+$/, "");
    return doi;
  }

  // Try to extract from DOI URLs
  const doiUrlRegex = /doi\.org\/(10\.\d{4,}\/[^\s<>"']+)/;
  match = url.match(doiUrlRegex);
  if (match) {
    let doi = match[1];
    doi = doi.replace(/[.,;:)}\]]+$/, "");
    return doi;
  }

  return null;
}

/**
 * Extract publication year from paper data with multiple fallbacks
 */
function extractYearFromPaper(paper) {
  // Load manual dates from external configuration
  let manualDates = {};
  try {
    const configPath = path.join(__dirname, "../../publication-dates.json");
    const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
    manualDates = configData.manualDates || {};
  } catch (error) {
    console.warn(
      "Could not load publication-dates.json, using fallback detection",
    );
  }

  // Check manual override first
  const cleanTitle = paper.title
    ?.replace(/^\[(HTML|PDF|CITATION)\]\[(HTML|PDF|CITATION)\]\s*/, "")
    .trim();
  if (cleanTitle && manualDates[cleanTitle]) {
    return manualDates[cleanTitle];
  }

  // Try paper.year field
  if (paper.year && paper.year !== "2025") {
    return paper.year.toString();
  }

  // Try paper.date field
  if (paper.date) {
    const yearMatch = paper.date.match(/\d{4}/);
    if (yearMatch && parseInt(yearMatch[0]) <= new Date().getFullYear()) {
      return yearMatch[0];
    }
  }

  // Try to extract from description
  if (paper.description) {
    const descYearMatches = paper.description.match(/\b(19|20)\d{2}\b/g);
    if (descYearMatches) {
      // Get the most recent reasonable year
      const years = descYearMatches
        .map((y) => parseInt(y))
        .filter((y) => y >= 2015 && y <= new Date().getFullYear())
        .sort((a, b) => b - a);
      if (years.length > 0) {
        return years[0].toString();
      }
    }
  }

  // Try to extract from URL patterns (DOI, journal URLs often contain years)
  if (paper.url) {
    const urlYearMatch = paper.url.match(/\/(19|20)(\d{2})\//);
    if (urlYearMatch) {
      const year = parseInt(urlYearMatch[1] + urlYearMatch[2]);
      if (year >= 2015 && year <= new Date().getFullYear()) {
        return year.toString();
      }
    }
  }

  // Try source URL as well
  if (paper.source?.url) {
    const sourceYearMatch = paper.source.url.match(/\/(19|20)(\d{2})\//);
    if (sourceYearMatch) {
      const year = parseInt(sourceYearMatch[1] + sourceYearMatch[2]);
      if (year >= 2015 && year <= new Date().getFullYear()) {
        return year.toString();
      }
    }
  }

  // Try citation information if available
  if (paper.citation?.url) {
    const citationYearMatch = paper.citation.url.match(/as_ylo=(\d{4})/);
    if (citationYearMatch) {
      const year = parseInt(citationYearMatch[1]);
      if (year >= 2015 && year <= new Date().getFullYear()) {
        return year.toString();
      }
    }
  }

  // Last resort: try to find any 4-digit number that looks like a reasonable publication year
  const allText = [
    paper.title,
    paper.description,
    paper.url,
    paper.source?.url,
  ].join(" ");
  const allYearMatches = allText.match(/\b(19|20)\d{2}\b/g);
  if (allYearMatches) {
    const reasonableYears = allYearMatches
      .map((y) => parseInt(y))
      .filter((y) => y >= 2015 && y <= new Date().getFullYear())
      .sort((a, b) => b - a); // Most recent first

    if (reasonableYears.length > 0) {
      return reasonableYears[0].toString();
    }
  }

  // Final fallback - use current year but warn
  console.warn(`Could not determine publication year for: ${paper.title}`);
  return new Date().getFullYear().toString();
}

/**
 * Combines publications from multiple sources and removes duplicates
 * @param {Array} sources - Array of publication arrays from different sources
 * @returns {Array} Deduplicated and sorted publications
 */
export function combinePublications(...sources) {
  const allPublications = sources.flat();

  // Remove duplicates based on title similarity
  const uniquePublications = [];
  const seenTitles = new Set();

  for (const pub of allPublications) {
    const normalizedTitle = pub.title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniquePublications.push(pub);
    }
  }

  // Sort by year (newest first)
  return uniquePublications.sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });
}

/**
 * Main function to fetch publications from configured sources
 * @param {Object} config - Configuration object with author info and preferences
 * @returns {Array} Array of publications
 */
export async function fetchPublications(config = {}) {
  const {
    authorName = "Jonah Mack",
    orcidId = null,
    googleScholar = true,
    orcid = true,
    yearLow = 2020,
  } = config;

  const publicationSources = [];

  // Fetch from ORCID if ID is provided
  if (orcid && orcidId) {
    try {
      const orcidPubs = await fetchORCIDPublications(orcidId);
      publicationSources.push(orcidPubs);
      console.log(`Found ${orcidPubs.length} publications from ORCID`);
    } catch (error) {
      console.warn("Failed to fetch from ORCID:", error);
    }
  }

  // Fetch from Google Scholar
  if (googleScholar) {
    try {
      const scholarPubs = await fetchGoogleScholarPublications(authorName, {
        yearLow,
      });
      publicationSources.push(scholarPubs);
      console.log(
        `Found ${scholarPubs.length} publications from Google Scholar`,
      );
    } catch (error) {
      console.warn("Failed to fetch from Google Scholar:", error);
    }
  }

  // Combine and deduplicate
  const combinedPublications = combinePublications(...publicationSources);
  console.log(`Total unique publications: ${combinedPublications.length}`);

  return combinedPublications;
}
