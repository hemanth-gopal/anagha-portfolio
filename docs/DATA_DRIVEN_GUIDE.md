# Data-Driven Sections Guide

**Status**: ✅ **ENABLED** - Skills, Experience, and Projects are now data-driven!

## Overview

Skills, Experience, and Projects sections are now managed through data arrays in `script.js`. Just edit the data arrays to update content - no HTML editing needed!

## Location

**File**: `script.js` (lines ~956-1130 for data, ~1132-1274 for functions)

**Status**: ✅ Already enabled! Functions run automatically on page load.

## How to Update Content

### Skills
Edit the `skillsData` array (~line 964):
```javascript
{
  title: "Category Name",
  icon: "fa-icon-name",
  skills: [
    { name: "Skill Name", icon: "fa-icon-name" }
  ]
}
```

### Experience
Edit the `experienceData` array (~line 1019):
```javascript
{
  title: "Job Title",
  company: "Company Name",
  dates: "Start – End",
  location: "City, Country",
  achievements: ["Achievement 1", "Achievement 2"]
}
```

### Projects
Edit the `projectsData` object (~line 1065):
```javascript
{
  title: "Project Title",
  role: "Project Role",
  description: "Description...",
  icon: "fa-icon-name",
  actions: [
    { text: "Button Text", link: "https://url.com" }  // Empty link = button only
  ]
}
```

## How It Works

1. **On page load**: Functions automatically generate HTML from data arrays
2. **Content updates**: Edit data arrays → refresh page → content updates automatically
3. **No HTML editing**: All content comes from JavaScript data

## Notes

- ✅ **Active**: Data-driven mode is enabled and working
- ✅ **Future-proof**: Just edit data arrays to add/update content
- ✅ **Same as Certifications**: Uses the same pattern as the Certifications section
- ✅ **Automatic**: Content generates on every page load

