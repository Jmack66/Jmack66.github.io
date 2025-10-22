import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
📅 Publication Date Setter

Usage:
  node scripts/set-publication-date.js "Publication Title" YYYY

Examples:
  node scripts/set-publication-date.js "An Optimised Spider-Inspired Soft Actuator" 2025
  node scripts/set-publication-date.js "Design of a Hall effect sensor" 2022

Options:
  --help, -h     Show this help message
  --list         List all current publication date overrides
  --remove       Remove a publication date override

List current overrides:
  node scripts/set-publication-date.js --list

Remove an override:
  node scripts/set-publication-date.js --remove "Publication Title"
`);
  process.exit(0);
}

// Handle list command
if (args.includes("--list")) {
  try {
    const configPath = path.join(__dirname, "../publication-dates.json");
    const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const manualDates = configData.manualDates || {};

    console.log("\n📚 Current Publication Date Overrides:\n");

    if (Object.keys(manualDates).length === 0) {
      console.log("No manual date overrides set.");
    } else {
      Object.entries(manualDates)
        .sort(([, a], [, b]) => b.localeCompare(a)) // Sort by year desc
        .forEach(([title, year]) => {
          console.log(`📄 ${year}: ${title}`);
        });
    }

    console.log(
      `\nTotal: ${Object.keys(manualDates).length} publication(s) with manual dates\n`,
    );
  } catch (error) {
    console.error("❌ Error reading publication dates:", error.message);
  }
  process.exit(0);
}

// Handle remove command
if (args.includes("--remove")) {
  const removeIndex = args.indexOf("--remove");
  if (removeIndex === -1 || !args[removeIndex + 1]) {
    console.error("❌ Please provide a publication title to remove");
    process.exit(1);
  }

  const titleToRemove = args[removeIndex + 1];

  try {
    const configPath = path.join(__dirname, "../publication-dates.json");
    const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));

    if (configData.manualDates && configData.manualDates[titleToRemove]) {
      delete configData.manualDates[titleToRemove];

      fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), "utf8");
      console.log(
        `✅ Removed publication date override for: "${titleToRemove}"`,
      );
    } else {
      console.log(`⚠️  No date override found for: "${titleToRemove}"`);
    }
  } catch (error) {
    console.error("❌ Error removing publication date:", error.message);
    process.exit(1);
  }

  process.exit(0);
}

// Handle set command (only if not list or remove)
if (args.length < 2) {
  console.error("❌ Please provide both title and year");
  console.error('Usage: node scripts/set-publication-date.js "Title" YYYY');
  process.exit(1);
}

const title = args[0];
const year = args[1];

if (!title || !year) {
  console.error("❌ Please provide both title and year");
  console.error('Usage: node scripts/set-publication-date.js "Title" YYYY');
  process.exit(1);
}

// Validate year
if (!/^\d{4}$/.test(year)) {
  console.error("❌ Year must be a 4-digit number (e.g., 2024)");
  process.exit(1);
}

const yearNum = parseInt(year);
if (yearNum < 1900 || yearNum > new Date().getFullYear() + 5) {
  console.error(
    `❌ Year must be between 1900 and ${new Date().getFullYear() + 5}`,
  );
  process.exit(1);
}

try {
  const configPath = path.join(__dirname, "../publication-dates.json");

  // Load existing config or create new one
  let configData;
  try {
    configData = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    // Create new config if file doesn't exist
    configData = {
      manualDates: {},
      _instructions: {
        description:
          "Manual date overrides for publications when Google Scholar doesn't provide accurate dates",
        usage: "Add entries in the format: 'Exact Publication Title': 'YYYY'",
        note: "Titles must match exactly (after removing [HTML][HTML] prefixes)",
        tip: "To find correct years: 1) Visit the publication DOI/URL, 2) Check journal website, 3) Look at your CV/records",
      },
    };
  }

  // Ensure manualDates exists
  if (!configData.manualDates) {
    configData.manualDates = {};
  }

  // Check if this title already exists
  const isUpdate = configData.manualDates[title] !== undefined;
  const oldYear = configData.manualDates[title];

  // Set the new date
  configData.manualDates[title] = year;

  // Write back to file
  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), "utf8");

  if (isUpdate) {
    console.log(`✅ Updated publication date for:`);
    console.log(`   📄 "${title}"`);
    console.log(`   📅 ${oldYear} → ${year}`);
  } else {
    console.log(`✅ Added publication date override:`);
    console.log(`   📄 "${title}"`);
    console.log(`   📅 ${year}`);
  }

  console.log(`\n💡 Next steps:`);
  console.log(`   1. Run: npm run update-publications`);
  console.log(`   2. Run: npm run build`);
  console.log(`   3. Commit and push your changes`);
} catch (error) {
  console.error("❌ Error setting publication date:", error.message);
  process.exit(1);
}
