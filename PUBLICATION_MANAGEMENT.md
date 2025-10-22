# Publication Management System

This document explains how to manage your publication dates and keep your portfolio up-to-date with accurate information.

## 🎯 Quick Start

1. **Check current publications**: `npm run update-publications:dry-run`
2. **Verify dates are correct**: `npm run verify-publication-dates`
3. **Fix any wrong dates**: `npm run set-publication-date "Paper Title" 2025`
4. **Update your site**: `npm run update-publications && npm run build`
5. **Deploy**: `git add . && git commit -m "Update publications" && git push`

## 🛠️ Available Commands

### Core Commands
```bash
# Fetch publications and update config (main command)
npm run update-publications

# Preview what would be updated without making changes
npm run update-publications:dry-run

# Only get recent publications (2022+)
npm run update-publications:recent
```

### Date Management
```bash
# Set a specific publication date
npm run set-publication-date "Publication Title" YYYY

# List all current date overrides
npm run list-publication-dates

# Verify publication dates with URLs for manual checking
npm run verify-publication-dates
```

### Development
```bash
# Build and test locally
npm run build
npm run preview

# Check for any build errors
npm run build --verbose
```

## 📊 How It Works

### 1. Data Sources
- **Primary**: Google Scholar search results
- **Fallback**: Manual date overrides in `publication-dates.json`
- **Static**: Your `src/config.ts` file (updated automatically)

### 2. Date Detection Priority
1. **Manual overrides** (most reliable) → `publication-dates.json`
2. **Google Scholar API** data (often unreliable)
3. **URL pattern analysis** (year hints from DOIs, URLs)
4. **Description text parsing** (years mentioned in abstracts)
5. **Current year fallback** (least reliable)

### 3. Data Flow
```
Google Scholar → Date Detection → Manual Overrides → Config Update → Site Build
```

## 📅 Managing Publication Dates

### When Google Scholar Gets Dates Wrong

**Problem**: Publications showing wrong years (e.g., 2025 papers showing as 2024)

**Solution**: Use manual overrides
```bash
# Set correct date
npm run set-publication-date "An Optimised Spider-Inspired Soft Actuator" 2025

# Update publications with new date
npm run update-publications

# Verify the change
npm run update-publications:dry-run
```

### Batch Date Updates

**For multiple corrections**:
1. Use `npm run verify-publication-dates` to get URLs
2. Visit each URL to verify actual publication date
3. Set each correction: `npm run set-publication-date "Title" YYYY`
4. Update once: `npm run update-publications`

### Finding Correct Publication Dates

**Best sources for accurate dates**:
1. **Journal website** - visit the publication URL directly
2. **DOI link** - most authoritative source
3. **Your CV/records** - your personal documentation
4. **Publisher metadata** - check journal volume/issue dates

**Where to look on journal websites**:
- "Published online: DD MMM YYYY"
- "Received: / Accepted: / Published:"
- Meta tags: `<meta name="citation_publication_date">`
- Volume/Issue information

## 🔧 Configuration Files

### `publication-dates.json`
Manual date overrides for problematic publications:
```json
{
  "manualDates": {
    "An Optimised Spider-Inspired Soft Actuator for Extraterrestrial Exploration": "2025",
    "Design of a Hall effect sensor controlled brittle star inspired composite robotic limb": "2022"
  }
}
```

**Important**: Title must match exactly (after removing `[HTML][HTML]` prefixes)

### `src/config.ts`
Your main configuration file (updated automatically):
```typescript
publications: [
  {
    title: "Paper Title",
    authors: "Author Names",
    journal: "Journal Name",
    year: "2025",
    doi: "10.1234/example",
    link: "https://journal.com/paper"
  }
]
```

## 📈 Workflow Examples

### Monthly Update Routine
```bash
# Check for new publications
npm run update-publications:dry-run

# If new papers found, update
npm run update-publications

# Build and deploy
npm run build
git add . && git commit -m "Update publications" && git push
```

### Fixing Wrong Dates
```bash
# Verify current dates
npm run verify-publication-dates

# Visit URLs and check actual publication dates

# Fix incorrect dates
npm run set-publication-date "Paper Title" 2025
npm run set-publication-date "Another Paper" 2024

# Apply corrections
npm run update-publications

# Deploy
git add . && git commit -m "Fix publication dates" && git push
```

### Adding New Publications Manually
If Google Scholar hasn't indexed your latest paper:

1. **Add to manual overrides first**:
```bash
npm run set-publication-date "Your New Paper Title" 2025
```

2. **Or edit `src/config.ts` directly**:
```typescript
publications: [
  {
    title: "Your New Paper Title",
    authors: "Your Name, Co-Author",
    journal: "Journal Name", 
    year: "2025",
    doi: "10.1234/newpaper",
    link: "https://journal.com/newpaper"
  },
  // ... existing papers
]
```

## 🐛 Troubleshooting

### Publications Not Showing Up
1. **Check the build**: `npm run build` (look for errors)
2. **Verify config**: Check `src/config.ts` has your publications
3. **Check component**: Publications component should import and display them
4. **Clear cache**: Try incognito mode to view deployed site

### Wrong Publication Dates
1. **Check manual overrides**: `npm run list-publication-dates`
2. **Verify titles match exactly**: Case-sensitive, exact match required
3. **Check for typos**: Title in override must match Google Scholar result exactly
4. **Test locally**: `npm run build` to see if dates update

### Google Scholar Not Finding Papers
1. **Author name variations**: Try "J. Mack" vs "Jonah Mack" in config
2. **Wait for indexing**: New papers can take weeks/months to appear
3. **Add manually**: Use manual config addition as workaround
4. **Adjust year filter**: Lower `yearLow` in config to include older papers

### Build Errors
1. **Check syntax**: Ensure JSON files are valid
2. **Title formatting**: Remove special characters that might break parsing
3. **Network issues**: Google Scholar fetching might fail (will use fallback)
4. **Dependencies**: Ensure `@rpidanny/google-scholar` is installed

## 📋 File Structure

```
Jmack66.github.io/
├── src/
│   ├── config.ts                    # Main configuration (auto-updated)
│   ├── components/Publications.astro # Publications display component
│   └── utils/publications.js        # Publication fetching logic
├── scripts/
│   ├── update-publications.js       # Main update script
│   ├── set-publication-date.js      # Date management tool
│   └── verify-publication-dates.js  # Date verification helper
├── publication-dates.json           # Manual date overrides
└── package.json                     # npm scripts
```

## 🚀 Best Practices

### Regular Maintenance
- **Monthly**: Run `npm run update-publications` to catch new papers
- **After publishing**: Check if new papers appear within 4-6 weeks
- **Before conferences**: Update portfolio with latest work

### Date Accuracy
- **Always verify**: Don't trust Google Scholar dates blindly
- **Use primary sources**: Journal websites are most reliable
- **Keep records**: Document correct dates in your own files
- **Check DOIs**: Most authoritative publication date source

### Version Control
- **Commit changes**: Always commit after updating publications
- **Descriptive messages**: `git commit -m "Add 3 new publications from 2024"`
- **Review changes**: Check `git diff` before committing
- **Test first**: Use `npm run build` before pushing

## 🎓 Academic Workflow Integration

### For New Publications
1. **Submit paper** → **Accepted** → **Published online**
2. **Wait 2-4 weeks** for Google Scholar indexing
3. **Run update script** to check for new papers
4. **Verify dates** using journal website
5. **Update portfolio** and deploy

### For Conference vs Journal Papers
- **Conference papers**: Use conference date, not journal reprint date
- **Journal papers**: Use online publication date, not print date
- **Preprints**: Consider using preprint date or "in press"

### Citation Management
- **Keep consistent**: Match your CV and portfolio dates
- **Update ORCID**: Keep ORCID profile in sync
- **Reference management**: Update Mendeley/Zotero with same dates