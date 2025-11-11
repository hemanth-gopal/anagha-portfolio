# How to Add Courses to Masters Education

## Quick Guide

To add courses to your Master's degree, simply edit the `mastersCourses` array in `script.js`. The **entire education card** flips to show courses on the back.

## Location

**File:** `script.js`  
**Lines:** ~11-23

## Current Courses (UT Arlington)

The following 10 popular courses from UT Arlington's Construction Management program are currently listed:

```javascript
const mastersCourses = [
  "Construction Methods – Field Operations",
  "Construction Contracts, Specifications, and Administration",
  "Construction Cost Estimating",
  "Construction Planning and Scheduling",
  "Construction Management",
  "Building Information Modeling (BIM)",
  "Construction Finance",
  "Construction Sustainability",
  "Construction Productivity",
  "Risk Management"
];
```

## How to Add Your Courses

1. Open `script.js`
2. Find the `mastersCourses` array (near the top of the file)
3. Replace the placeholders with your actual course names:

```javascript
const mastersCourses = [
  "Construction Project Management",
  "Sustainable Building Practices",
  "Building Information Modeling (BIM)",
  "Construction Law and Contracts",
  "Cost Estimation and Control",
  "Construction Safety Management",
  "Advanced Construction Methods",
  "Project Scheduling and Control",
  "Construction Finance",
  "Lean Construction Principles"
];
```

## Features

- ✅ **Entire Card Flips**: The whole Masters education card flips (not just a section)
- ✅ **Front Side**: Shows degree, institution, dates, location, and description
- ✅ **Back Side**: Displays all 10 courses in a numbered list with teal gradient
- ✅ **No Extra Space**: Courses hidden on the back, no additional sections
- ✅ **Future-Proof**: Just add course names to the array
- ✅ **Auto-Numbered**: Courses are automatically numbered (01, 02, 03...)
- ✅ **Responsive**: Works perfectly on all devices
- ✅ **Smooth 3D Animation**: Beautiful flip transition (similar to certifications)
- ✅ **Scrollable**: If you have many courses, the back side scrolls
- ✅ **Visual Hint**: "Hover to view courses" indicator on front

## How It Works

- **Front Side**: Shows all education details (degree, institution, dates, location, description) with a hint to hover
- **Back Side**: Displays "Course List" header and all courses in a numbered list with teal gradient background
- **Interaction**: Hover over the entire Masters education card to flip it and see courses
- **Mobile**: Touch-friendly, works on all screen sizes

## Notes

- The entire Masters education card is flippable (Bachelor's remains unchanged)
- Currently set up for 10 courses (can be adjusted if needed)
- Courses are displayed in the order you add them
- The back side automatically shows the total number of courses
- Front side shows a subtle "Hover to view courses" hint

