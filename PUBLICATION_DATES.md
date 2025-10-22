# Publication Date Management

This file explains how to manage publication dates for your portfolio when Google Scholar doesn't provide accurate publication years.

## 📅 How Date Detection Works

The system attempts to find publication years in this order:

1. **Manual overrides** from `publication-dates.json` (most reliable)
2. **Paper year field** from Google Scholar API
3. **Paper date field** from Google Scholar API  
4. **Description text** - searches for 4-digit years
5. **URL patterns** - looks for years in DOI/journal URLs
6. **Citation metadata** - extracts from citation URLs
7. **Text analysis** - finds reasonable years in all available text
8. **Current year fallback** - uses current year as last resort

## 🔧 Manual Date Overrides

To set specific publication years, edit `publication-dates.json`:

```json
{
  "manualDates": {
    "Exact Publication Title": "YYYY",
    "Another Paper Title": "YYYY"
  }
}
```

### Important Notes:
- **Exact match required**: Title must match exactly (after removing `[HTML][HTML]` prefixes)
- **Format**: Use 4-digit year as string (e.g., `"2024"`)
- **Case sensitive**: Make sure capitalization matches

## 🔍 Finding Correct Publication Years

To find the correct publication year for a paper:

1. **Check the actual publication** - visit the DOI or journal link
2. **Look at Google Scholar** - sometimes shows correct year in full view
3. **Check your CV/records** - use your personal publication records
4. **Look at journal metadata** - most reliable source

## 🛠️ Updating Publication Dates

### Method 1: Update the JSON file
1. Edit `publication-dates.json`
2. Run `npm run update-publications`
3. Commit changes

### Method 2: Check what needs fixing
1. Run `npm run update-publications:dry-run`
2. Review the years shown
3. Add any incorrect ones to `publication-dates.json`
4. Run `npm run update-publications`

## 📋 Common Issues & Solutions

### Issue: Paper showing current year instead of actual year
**Solution**: Add entry to `publication-dates.json`

```json
{
  "manualDates": {
    "Your Paper Title Here": "2022"
  }
}
```

### Issue: Preprint vs. final publication dates
**Recommendation**: Use the final publication date, not the preprint date

### Issue: Conference vs. journal publication dates
**Recommendation**: Use the final publication venue date

## 🔄 Workflow for New Publications

When you publish a new paper:

1. **Wait for Google Scholar** to index it (can take weeks/months)
2. **Run update script**: `npm run update-publications:dry-run`
3. **Check the year** - if incorrect, add to `publication-dates.json`
4. **Update publications**: `npm run update-publications`
5. **Commit and push** to deploy

## 📊 Example publication-dates.json

```json
{
  "manualDates": {
    "An Optimised Spider-Inspired Soft Actuator for Extraterrestrial Exploration": "2024",
    "Design of a Hall effect sensor controlled brittle star inspired composite robotic limb": "2022",
    "Machine Learning Approaches for Manufacturing Process Optimization": "2023"
  },
  "_instructions": {
    "description": "Manual date overrides for publications when Google Scholar doesn't provide accurate dates",
    "usage": "Add entries in the format: 'Exact Publication Title': 'YYYY'",
    "note": "Titles must match exactly (after removing [HTML][HTML] prefixes)"
  }
}
```

## 🚨 Troubleshooting

### Script warnings about dates
- Check console output when running the script
- Look for: `Could not determine publication year for: [Title]`
- Add these papers to your manual overrides

### Years still showing incorrectly
1. Verify the title in `publication-dates.json` matches exactly
2. Check for typos in the year (must be string, e.g., `"2024"`)
3. Run `npm run build` to test locally before pushing

### Need to bulk update years
- Edit multiple entries in `publication-dates.json`
- Run the update script once to apply all changes

## 💡 Pro Tips

- **Keep a backup**: Save your publication dates in a spreadsheet too
- **Regular updates**: Run the script monthly to catch new publications
- **Verify manually**: Always double-check important publication years
- **Use DOI dates**: When in doubt, use the DOI registration date as reference