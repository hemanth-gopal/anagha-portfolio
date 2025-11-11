# How to Add New Certifications

The certifications section is now **data-driven** and **future-proof**! Adding new certifications is super easy.

## 📝 Quick Guide

### To Add a New Certification:

1. Open `script.js`
2. Find the `certificationsData` array (around line 649)
3. Add a new object to the array

### Example:

```javascript
{
  title: "Your Certification Name",
  organization: "Issuing Organization",
  date: "Month Year",
  description: "Brief description of what this certification covers.",
  icon: "fa-certificate",  // Font Awesome icon class (without 'fas')
  badge: "Certified",      // Badge text (e.g., "Certified", "Completed", "Published")
  type: "certification",   // Options: "certification", "course", "publication"
  link: ""                 // Optional: Add URL to certificate if available
}
```

## 🎨 Available Icons

You can use any Font Awesome icon. Common ones:
- `fa-certificate` - General certificate
- `fa-award` - Award/certification
- `fa-trophy` - Achievement
- `fa-graduation-cap` - Education
- `fa-book` - Publication/book
- `fa-code` - Programming/tech
- `fa-chart-line` - Analytics/marketing
- `fa-leaf` - Environment/sustainability
- `fa-cube` - BIM/3D modeling
- `fa-building` - Architecture
- `fa-users` - Team/leadership
- `fa-lightbulb` - Innovation
- `fa-globe` - International/global

**Full list**: https://fontawesome.com/icons

## 🎨 Colors

Colors are **automatically assigned** - they cycle through 6 beautiful color schemes. You don't need to worry about colors!

## 📋 Complete Example

```javascript
{
  title: "LEED Green Associate",
  organization: "USGBC",
  date: "March 2023",
  description: "Certified in sustainable building practices and green building design principles.",
  icon: "fa-leaf",
  badge: "LEED Certified",
  type: "certification",
  link: "https://example.com/certificate.pdf"  // Optional
}
```

## 🔗 Adding Links

If you have a certificate URL or PDF link, just add it to the `link` field:

```javascript
link: "https://example.com/my-certificate.pdf"
```

The card will automatically become clickable and show a "View Certificate →" link on the back.

## ✅ That's It!

- Colors are assigned automatically
- Cards are generated automatically
- Carousel updates automatically
- Dots update automatically
- Everything works!

---

**Location in code**: `script.js` → `certificationsData` array (around line 649)

