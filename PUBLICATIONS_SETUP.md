# Dynamic Publications Setup Guide

This guide will help you set up automatic publication fetching from Google Scholar and/or ORCID instead of manually updating your publications in the config file.

## Quick Setup

### Option 1: Google Scholar (Easiest)

1. **Enable dynamic fetching** in `src/config.ts`:
```typescript
publicationConfig: {
  enableDynamicFetch: true,
  authorName: "Your Full Name", // Update this to your name
  sources: {
    orcid: false,
    googleScholar: true,
  },
  yearLow: 2020, // Only fetch publications from 2020 onwards
},
```

2. **Build your site** - publications will be fetched automatically:
```bash
npm run build
```

### Option 2: ORCID (Most Reliable)

If you have an ORCID ID (highly recommended for academics):

1. **Find your ORCID ID** at [orcid.org](https://orcid.org)
   - It looks like: `0000-0000-0000-0000`

2. **Update your config** in `src/config.ts`:
```typescript
publicationConfig: {
  enableDynamicFetch: true,
  authorName: "Your Full Name",
  orcidId: "0000-0000-0000-0000", // Your ORCID ID
  sources: {
    orcid: true,
    googleScholar: false, // Can be true for both sources
  },
  yearLow: 2020,
},
```

### Option 3: Both Sources (Best Coverage)

Combine both for maximum coverage and automatic deduplication:

```typescript
publicationConfig: {
  enableDynamicFetch: true,
  authorName: "Your Full Name",
  orcidId: "0000-0000-0000-0000",
  sources: {
    orcid: true,
    googleScholar: true,
  },
  yearLow: 2020,
},
```

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `enableDynamicFetch` | Enable/disable dynamic fetching | `false` |
| `authorName` | Your full name for Google Scholar search | Required |
| `orcidId` | Your ORCID ID (format: 0000-0000-0000-0000) | `null` |
| `sources.orcid` | Fetch from ORCID API | `true` |
| `sources.googleScholar` | Fetch from Google Scholar | `true` |
| `yearLow` | Only fetch publications from this year onwards | `2020` |

## How It Works

### At Build Time
1. **ORCID**: Fetches from the official ORCID API using your ORCID ID
2. **Google Scholar**: Searches for papers by your name using the `@rpidanny/google-scholar` package
3. **Deduplication**: Automatically removes duplicate publications
4. **Sorting**: Publications are sorted by year (newest first)

### Data Format
Publications are automatically converted to this format:
- `title`: Publication title
- `authors`: Author list
- `journal`: Journal/venue name  
- `year`: Publication year
- `volume`: Journal volume (if available)
- `pages`: Page range (if available)
- `doi`: Digital Object Identifier (if available)
- `link`: URL to the publication (if available)

## Troubleshooting

### No Publications Found
- **Check your name spelling**: Make sure `authorName` matches how you appear in publications
- **ORCID not working**: Verify your ORCID ID is correct and public
- **Google Scholar blocked**: Try increasing `yearLow` or check if Google Scholar is accessible

### Build Errors
- **Network issues**: The fetching happens at build time, ensure you have internet access
- **Rate limiting**: If you get rate limited, try building again after a few minutes

### Fallback Behavior
If dynamic fetching fails, the system automatically falls back to the static `publications` array in your config file.

## Migration from Static Publications

1. **Keep your existing publications** in the config as a fallback
2. **Enable dynamic fetching** gradually by setting `enableDynamicFetch: true`
3. **Test the build** to ensure publications are fetched correctly
4. **Optional**: Remove static publications once you're confident in the dynamic fetching

## Advanced Usage

### Custom Filtering
Modify `src/utils/publications.js` to add custom filtering:

```javascript
// Example: Filter out specific publication types
export async function fetchPublications(config = {}) {
  const publications = await fetchAllPublications(config);
  
  // Custom filtering logic here
  return publications.filter(pub => {
    // Example: Only include journal articles
    return pub.journal && !pub.journal.includes('Conference');
  });
}
```

### Caching
For faster builds, consider implementing caching:
- Cache publications for a day/week to avoid repeated API calls
- Store cached data in a JSON file or use a simple file-based cache

## API Limitations

### Google Scholar
- **Rate limiting**: May be blocked if too many requests
- **No official API**: Uses scraping, which can be unreliable
- **Accuracy**: May include papers by authors with similar names

### ORCID
- **Public data only**: Only fetches publicly available information
- **Manual updates**: Publications must be added to your ORCID profile manually or through integrations
- **Rate limits**: 40 requests per second per client

## Security Notes

- **No API keys required**: Both ORCID and the Google Scholar package work without authentication
- **Build-time only**: Publications are fetched during build, not at runtime
- **No sensitive data**: Only public publication information is accessed

## Getting Help

If you encounter issues:
1. Check the build logs for error messages
2. Temporarily disable dynamic fetching to test the fallback
3. Verify your ORCID ID is publicly accessible
4. Try fetching from only one source to isolate issues

## Future Enhancements

Potential improvements you could add:
- **Crossref API integration** for more publication metadata
- **arXiv integration** for preprints
- **Publication metrics** (citation counts, h-index)
- **Automatic ORCID profile updates** using the member API