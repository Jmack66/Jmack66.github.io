import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract publication dates from Google Scholar citation data
 * This script uses headless browser to access citation popup/page data
 */

async function extractCitationDates(papers) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

  for (const paper of papers) {
    console.log(`\n📄 Processing: ${paper.title.substring(0, 60)}...`);

    try {
      if (paper.citation?.url) {
        // Navigate to citation page
        console.log(`🔗 Accessing citation URL...`);
        await page.goto(paper.citation.url, { waitUntil: 'networkidle0', timeout: 10000 });

        // Look for citation formats that might contain dates
        const citationData = await page.evaluate(() => {
          // Look for citation text in various formats
          const citationSelectors = [
            '#gs_citi',
            '.gs_citr',
            '.citation',
            '#citation-text',
            '.formatted-citation'
          ];

          let citationText = '';
          for (const selector of citationSelectors) {
            const element = document.querySelector(selector);
            if (element) {
              citationText = element.textContent || element.innerText;
              break;
            }
          }

          // Also check for meta tags with dates
          const metaTags = document.querySelectorAll('meta');
          const metaData = {};
          metaTags.forEach(meta => {
            const name = meta.getAttribute('name') || meta.getAttribute('property');
            const content = meta.getAttribute('content');
            if (name && content) {
              metaData[name] = content;
            }
          });

          return {
            citationText,
            metaData,
            url: window.location.href
          };
        });

        // Extract year from citation text
        const year = extractYearFromCitation(citationData.citationText, citationData.metaData);

        if (year) {
          console.log(`✅ Found year: ${year}`);
          results.push({
            title: paper.title,
            extractedYear: year,
            source: 'google_scholar_citation',
            citationText: citationData.citationText.substring(0, 200) + '...'
          });
        } else {
          console.log(`❌ No year found in citation`);
          results.push({
            title: paper.title,
            extractedYear: null,
            source: 'google_scholar_citation',
            citationText: citationData.citationText.substring(0, 200) + '...'
          });
        }

        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Also try direct URL scraping if available
      if (paper.url && !results.find(r => r.title === paper.title && r.extractedYear)) {
        console.log(`🌐 Trying direct URL scraping...`);
        const urlYear = await extractYearFromDirectURL(page, paper.url);
        if (urlYear) {
          console.log(`✅ Found year from direct URL: ${urlYear}`);
          const existingResult = results.find(r => r.title === paper.title);
          if (existingResult) {
            existingResult.extractedYear = urlYear;
            existingResult.source = 'direct_url';
          } else {
            results.push({
              title: paper.title,
              extractedYear: urlYear,
              source: 'direct_url',
              citationText: ''
            });
          }
        }
      }

    } catch (error) {
      console.log(`❌ Error processing ${paper.title.substring(0, 30)}: ${error.message}`);
      results.push({
        title: paper.title,
        extractedYear: null,
        source: 'error',
        error: error.message
      });
    }
  }

  await browser.close();
  return results;
}

/**
 * Extract year from citation text using various patterns
 */
function extractYearFromCitation(citationText, metaData = {}) {
  if (!citationText) return null;

  // Common citation patterns
  const patterns = [
    // APA format: (2024)
    /\((\d{4})\)/,
    // MLA format: Year after author
    /\w+,\s+\w+\.\s+(\d{4})\./,
    // Chicago: (2024, Month Day)
    /\((\d{4}),/,
    // IEEE: year in quotes
    /"(\d{4})"/,
    // General year pattern
    /\b(19|20)\d{2}\b/g
  ];

  // Try meta data first
  for (const [key, value] of Object.entries(metaData)) {
    if (key.includes('date') || key.includes('year')) {
      const yearMatch = value.match(/\b(20\d{2})\b/);
      if (yearMatch) return yearMatch[0];
    }
  }

  // Try citation text patterns
  for (const pattern of patterns) {
    const matches = citationText.match(pattern);
    if (matches) {
      if (pattern.global) {
        // For global patterns, find the most recent reasonable year
        const years = matches
          .map(match => parseInt(match))
          .filter(year => year >= 1990 && year <= new Date().getFullYear() + 1)
          .sort((a, b) => b - a);
        if (years.length > 0) return years[0].toString();
      } else {
        const year = parseInt(matches[1]);
        if (year >= 1990 && year <= new Date().getFullYear() + 1) {
          return year.toString();
        }
      }
    }
  }

  return null;
}

/**
 * Extract year from direct URL by scraping the publication page
 */
async function extractYearFromDirectURL(page, url) {
  try {
    console.log(`  📄 Scraping: ${url.substring(0, 50)}...`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });

    const yearData = await page.evaluate(() => {
      // Look for publication date in meta tags
      const metaSelectors = [
        'meta[name="citation_publication_date"]',
        'meta[name="citation_date"]',
        'meta[name="dc.date"]',
        'meta[property="article:published_time"]',
        'meta[name="prism.publicationDate"]'
      ];

      for (const selector of metaSelectors) {
        const meta = document.querySelector(selector);
        if (meta) {
          const content = meta.getAttribute('content');
          if (content) {
            const yearMatch = content.match(/\b(20\d{2})\b/);
            if (yearMatch) return yearMatch[0];
          }
        }
      }

      // Look for date patterns in visible text
      const textSelectors = [
        '.publication-date',
        '.article-date',
        '.pub-date',
        'time[datetime]',
        '.date'
      ];

      for (const selector of textSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          const text = element.textContent || element.getAttribute('datetime') || '';
          const yearMatch = text.match(/\b(20\d{2})\b/);
          if (yearMatch) return yearMatch[0];
        }
      }

      // Look for structured data
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent);
          if (data.datePublished) {
            const yearMatch = data.datePublished.match(/\b(20\d{2})\b/);
            if (yearMatch) return yearMatch[0];
          }
        } catch (e) {
          // Ignore JSON parsing errors
        }
      }

      return null;
    });

    return yearData;
  } catch (error) {
    console.log(`  ❌ Error scraping URL: ${error.message}`);
    return null;
  }
}

/**
 * Update publication dates configuration with extracted data
 */
function updatePublicationDates(extractedDates) {
  const configPath = path.join(__dirname, '../publication-dates.json');

  let configData;
  try {
    configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    configData = { manualDates: {}, _instructions: {} };
  }

  if (!configData.manualDates) configData.manualDates = {};

  let updatedCount = 0;
  for (const result of extractedDates) {
    if (result.extractedYear) {
      const cleanTitle = result.title.replace(/^\[(HTML|PDF|CITATION)\]\[(HTML|PDF|CITATION)\]\s*/, '').trim();

      if (!configData.manualDates[cleanTitle]) {
        configData.manualDates[cleanTitle] = result.extractedYear;
        updatedCount++;
        console.log(`📅 Added: "${cleanTitle}" → ${result.extractedYear}`);
      } else if (configData.manualDates[cleanTitle] !== result.extractedYear) {
        console.log(`⚠️  Conflict: "${cleanTitle}" has ${configData.manualDates[cleanTitle]} but found ${result.extractedYear}`);
      }
    }
  }

  // Add metadata about the extraction
  configData._lastExtraction = {
    date: new Date().toISOString(),
    extractedCount: extractedDates.filter(d => d.extractedYear).length,
    totalProcessed: extractedDates.length,
    updatedCount
  };

  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
  console.log(`\n✅ Updated ${updatedCount} publication dates in configuration`);

  return updatedCount;
}

// Main execution function
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📅 Citation Date Extractor

Usage:
  node scripts/extract-citation-dates.js [options]

Options:
  --help, -h     Show this help message
  --test         Test with a small sample
  --update       Update publication-dates.json with extracted dates

Examples:
  node scripts/extract-citation-dates.js --test
  node scripts/extract-citation-dates.js --update

Note: This script requires puppeteer for browser automation
Install with: npm install puppeteer
`);
    process.exit(0);
  }

  try {
    // Import the publication fetcher
    const { fetchGoogleScholarPublications } = await import('../src/utils/publications.js');

    console.log('🔍 Fetching publications from Google Scholar...');
    const publications = await fetchGoogleScholarPublications('Jonah Mack', { yearLow: 2020 });

    if (publications.length === 0) {
      console.log('❌ No publications found');
      process.exit(1);
    }

    console.log(`📚 Found ${publications.length} publications, extracting citation dates...`);

    // Limit to test if requested
    const papersToProcess = args.includes('--test') ? publications.slice(0, 2) : publications;

    const extractedDates = await extractCitationDates(papersToProcess);

    // Display results
    console.log('\n📊 Results Summary:');
    console.log('====================');
    extractedDates.forEach(result => {
      const status = result.extractedYear ? '✅' : '❌';
      const year = result.extractedYear || 'Not found';
      console.log(`${status} ${year}: ${result.title.substring(0, 60)}...`);
    });

    const successCount = extractedDates.filter(r => r.extractedYear).length;
    console.log(`\n📈 Success rate: ${successCount}/${extractedDates.length} (${Math.round(successCount/extractedDates.length*100)}%)`);

    // Update configuration if requested
    if (args.includes('--update')) {
      const updatedCount = updatePublicationDates(extractedDates);

      if (updatedCount > 0) {
        console.log('\n💡 Next steps:');
        console.log('1. Run: npm run update-publications');
        console.log('2. Run: npm run build');
        console.log('3. Commit and push your changes');
      }
    } else {
      console.log('\n💡 To update publication-dates.json, run with --update flag');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { extractCitationDates, extractYearFromCitation };
