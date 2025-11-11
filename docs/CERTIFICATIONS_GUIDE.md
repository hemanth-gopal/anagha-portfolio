# Add Certifications

**Location**: `script.js` → `certificationsData` array (~line 649)

## Quick Add

1. Open `script.js`
2. Find `certificationsData` array
3. Add new object:

```javascript
{
  title: "Certification Name",
  organization: "Issuing Org",
  date: "Month Year",
  description: "Brief description.",
  icon: "fa-certificate",  // Font Awesome icon (without 'fas')
  badge: "Certified",      // Badge text
  type: "certification",   // "certification", "course", or "publication"
  link: ""                 // Optional: certificate URL
}
```

## Example

```javascript
{
  title: "LEED Green Associate",
  organization: "USGBC",
  date: "March 2023",
  description: "Certified in sustainable building practices.",
  icon: "fa-leaf",
  badge: "LEED Certified",
  type: "certification",
  link: "https://example.com/cert.pdf"  // Optional
}
```

## Icons

Common Font Awesome icons:
- `fa-certificate`, `fa-award`, `fa-trophy` - Certifications
- `fa-graduation-cap`, `fa-book` - Education/Publications
- `fa-code`, `fa-cube`, `fa-building` - Tech/Architecture
- `fa-leaf`, `fa-chart-line` - Sustainability/Analytics

**Full list**: https://fontawesome.com/icons

## Notes

- ✅ Colors assigned automatically (6 color schemes)
- ✅ Cards generated automatically
- ✅ Carousel updates automatically
- ✅ Add `link` for clickable certificate URL

