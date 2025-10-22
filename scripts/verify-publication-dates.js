import { fetchGoogleScholarPublications } from "../src/utils/publications.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Simple tool to verify publication dates by checking actual publication URLs
 * This helps identify which papers need manual date corrections
 */

async function verifyPublicationDates() {
  try {
    console.log("🔍 Fetching publications from Google Scholar...");
    const publications = await fetchGoogleScholarPublications("Jonah Mack", {
      yearLow: 2020,
    });

    if (publications.length === 0) {
      console.log("❌ No publications found");
      return;
    }

    console.log(`\n📚 Found ${publications.length} publications\n`);
    console.log("🔗 Publication URLs to verify manually:");
    console.log("=" .repeat(80));

    const results = [];

    for (let i = 0; i < publications.length; i++) {
      const pub = publications[i];
      const cleanTitle = pub.title.replace(/^\[(HTML|PDF|CITATION)\]\[(HTML|PDF|CITATION)\]\s*/, "").trim();

      console.log(`\n${i + 1}. ${pub.year} | ${cleanTitle}`);
      console.log(`   📄 Current year in config: ${pub.year}`);

      if (pub.link) {
        console.log(`   🔗 URL: ${pub.link}`);

        // Try to extract hints from URL
        const urlHints = extractYearHintsFromURL(pub.link);
        if (urlHints.length > 0) {
          console.log(`   💡 URL suggests: ${urlHints.join(", ")}`);
        }
      } else {
        console.log(`   ❌ No URL available`);
      }

      results.push({
        title: cleanTitle,
        currentYear: pub.year,
        url: pub.link,
        urlHints: extractYearHintsFromURL(pub.link || ""),
      });

      console.log("   " + "-".repeat(60));
    }

    // Generate verification report
    generateVerificationReport(results);

    console.log(`\n📋 Verification Instructions:`);
    console.log("1. Visit each URL above");
    console.log("2. Look for the actual publication date on the journal website");
    console.log("3. Note any incorrect years");
    console.log("4. Use: npm run set-publication-date \"Title\" YYYY");
    console.log("5. Then: npm run update-publications");

    console.log(`\n📁 Detailed report saved to: publication-verification-report.txt`);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

/**
 * Extract potential year hints from URLs
 */
function extractYearHintsFromURL(url) {
  if (!url) return [];

  const hints = [];

  // Look for years in path segments
  const yearMatches = url.match(/\b(20\d{2})\b/g);
  if (yearMatches) {
    const uniqueYears = [...new Set(yearMatches)];
    hints.push(...uniqueYears.filter(year => {
      const y = parseInt(year);
      return y >= 2000 && y <= new Date().getFullYear() + 2;
    }));
  }

  // MDPI specific patterns
  if (url.includes("mdpi.com")) {
    const mdpiMatch = url.match(/\/(\d+)\/(\d+)\/(\d+)$/);
    if (mdpiMatch) {
      hints.push("Check MDPI volume/issue for publication year");
    }
  }

  // DOI patterns
  if (url.includes("doi.org") || url.includes("/10.")) {
    const doiMatch = url.match(/10\.\d+\/[^\/]*?(\d{4})/);
    if (doiMatch) {
      hints.push(`DOI suggests: ${doiMatch[1]}`);
    }
  }

  return hints;
}

/**
 * Generate a detailed verification report
 */
function generateVerificationReport(results) {
  const reportPath = path.join(__dirname, "../publication-verification-report.txt");

  let report = `Publication Date Verification Report
Generated: ${new Date().toISOString()}
================================================

Instructions:
1. Visit each URL below
2. Find the actual publication date on the journal website
3. If the date is wrong, update using: npm run set-publication-date "Title" YYYY

Publications to verify:

`;

  results.forEach((result, index) => {
    report += `${index + 1}. ${result.title}
   Current Year: ${result.currentYear}
   URL: ${result.url || "No URL available"}
   URL Hints: ${result.urlHints.join(", ") || "None"}

   [ ] Verified correct  [ ] Needs update to: ____

   ${"=".repeat(80)}

`;
  });

  report += `\nQuick Commands:
===============

To update a publication date:
npm run set-publication-date "Exact Title Here" YYYY

To see current overrides:
npm run list-publication-dates

To update all publications after setting dates:
npm run update-publications

To test locally:
npm run build && npm run preview
`;

  fs.writeFileSync(reportPath, report);
}

/**
 * Generate npm commands for easy copying
 */
function generateUpdateCommands(results) {
  console.log(`\n📝 Quick Update Commands (copy/paste as needed):`);
  console.log("=" .repeat(60));

  results.forEach((result, index) => {
    if (result.title && result.currentYear) {
      const command = `npm run set-publication-date "${result.title}" ${result.currentYear}`;
      console.log(`# ${index + 1}. ${result.title.substring(0, 40)}...`);
      console.log(command);
      console.log();
    }
  });
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
📅 Publication Date Verification Tool

Usage:
  node scripts/verify-publication-dates.js [options]

Options:
  --help, -h     Show this help message
  --commands     Also generate copy-paste commands

Examples:
  node scripts/verify-publication-dates.js
  node scripts/verify-publication-dates.js --commands

This tool:
1. Fetches your current publications
2. Shows URLs for manual verification
3. Generates a checklist report
4. Helps identify which dates need correction
`);
  process.exit(0);
}

// Add npm script integration
if (args.includes("--commands")) {
  console.log("📝 Will also generate update commands...\n");
}

// Run the verification
verifyPublicationDates().then(() => {
  if (args.includes("--commands")) {
    // Re-run to generate commands
    fetchGoogleScholarPublications("Jonah Mack", { yearLow: 2020 })
      .then(publications => {
        const results = publications.map(pub => ({
          title: pub.title.replace(/^\[(HTML|PDF|CITATION)\]\[(HTML|PDF|CITATION)\]\s*/, "").trim(),
          currentYear: pub.year,
          url: pub.link,
        }));
        generateUpdateCommands(results);
      })
      .catch(console.error);
  }
});
