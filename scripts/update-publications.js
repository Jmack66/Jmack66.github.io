import { fetchPublications } from "../src/utils/publications.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for fetching publications
const publicationConfig = {
  authorName: "Jonah Mack",
  orcidId: null, // Add your ORCID ID if you have one
  sources: {
    orcid: false, // Set to true if you have orcidId
    googleScholar: true,
  },
  yearLow: 2020,
};

async function updatePublications() {
  try {
    console.log("🔍 Fetching publications...");

    // Fetch publications using your existing utility
    const fetchedPublications = await fetchPublications(publicationConfig);

    if (!fetchedPublications || fetchedPublications.length === 0) {
      console.warn("⚠️  No publications found. Config will not be updated.");
      return;
    }

    console.log(`✅ Found ${fetchedPublications.length} publications`);

    // Read the current config file
    const configPath = path.join(__dirname, "../src/config.ts");
    let configContent = fs.readFileSync(configPath, "utf8");

    // Generate the publications array string
    const publicationsString = generatePublicationsArray(fetchedPublications);

    // Replace the publications array in the config file
    // Look for the publications array and replace it
    const publicationsRegex = /publications:\s*\[[\s\S]*?\],(?=\s*projects:)/;

    if (publicationsRegex.test(configContent)) {
      configContent = configContent.replace(
        publicationsRegex,
        `publications: ${publicationsString},`
      );
    } else {
      console.error("❌ Could not find publications array in config file");
      console.log("📝 Here's the generated array you can manually copy:");
      console.log(publicationsString);
      return;
    }

    // Write the updated config back to file
    fs.writeFileSync(configPath, configContent, "utf8");

    console.log("🎉 Successfully updated config.ts with fetched publications!");
    console.log(`📊 Updated with ${fetchedPublications.length} publications`);

    // Show a summary
    console.log("\n📚 Updated Publications:");
    fetchedPublications.forEach((pub, index) => {
      console.log(`${index + 1}. ${pub.title} (${pub.year})`);
    });

  } catch (error) {
    console.error("❌ Error updating publications:", error);
    process.exit(1);
  }
}

function generatePublicationsArray(publications) {
  const publicationStrings = publications.map(pub => {
    const parts = [
      `      title: ${JSON.stringify(pub.title)},`,
      `      authors: ${JSON.stringify(pub.authors)},`,
      `      journal: ${JSON.stringify(pub.journal)},`,
      `      year: ${JSON.stringify(pub.year)},`
    ];

    if (pub.volume) {
      parts.push(`      volume: ${JSON.stringify(pub.volume)},`);
    }
    if (pub.pages) {
      parts.push(`      pages: ${JSON.stringify(pub.pages)},`);
    }
    if (pub.doi) {
      parts.push(`      doi: ${JSON.stringify(pub.doi)},`);
    }
    if (pub.link) {
      parts.push(`      link: ${JSON.stringify(pub.link)},`);
    }

    return `    {\n${parts.join('\n')}\n    }`;
  });

  return `[\n${publicationStrings.join(',\n')},\n  ]`;
}

// Add command line options
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
📚 Publication Updater Script

Usage:
  node scripts/update-publications.js [options]

Options:
  --help, -h     Show this help message
  --dry-run      Show what would be updated without writing to file
  --year <year>  Only fetch publications from this year onwards (default: 2020)

Examples:
  node scripts/update-publications.js
  node scripts/update-publications.js --year 2022
  node scripts/update-publications.js --dry-run
`);
  process.exit(0);
}

// Handle dry run
if (args.includes('--dry-run')) {
  console.log("🧪 DRY RUN MODE - No files will be modified");

  async function dryRun() {
    try {
      const fetchedPublications = await fetchPublications(publicationConfig);
      console.log(`\n📊 Would update config with ${fetchedPublications.length} publications:`);
      fetchedPublications.forEach((pub, index) => {
        console.log(`${index + 1}. ${pub.title} (${pub.year}) - ${pub.journal}`);
      });
    } catch (error) {
      console.error("❌ Error in dry run:", error);
    }
  }

  dryRun();
} else {
  // Handle year filter
  const yearIndex = args.indexOf('--year');
  if (yearIndex !== -1 && args[yearIndex + 1]) {
    publicationConfig.yearLow = parseInt(args[yearIndex + 1]);
    console.log(`📅 Filtering publications from ${publicationConfig.yearLow} onwards`);
  }

  // Run the update
  updatePublications();
}
