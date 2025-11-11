# Add Masters Courses

**Location**: `script.js` → `mastersCourses` array (~lines 11-23)

## Quick Add

1. Open `script.js`
2. Find `mastersCourses` array
3. Replace with your course names:

```javascript
const mastersCourses = [
  "Course Name 1",
  "Course Name 2",
  "Course Name 3",
  // Add more...
];
```

## Current Courses

10 UT Arlington Construction Management courses are listed. Replace with your actual courses.

## How It Works

- **Front**: Education details (degree, institution, dates, location, description)
- **Back**: Numbered course list with teal gradient
- **Interaction**: Hover over Masters card to flip
- **Auto-numbered**: Courses numbered 01, 02, 03...
- **Responsive**: Works on all devices

## Notes

- Entire Masters card flips (Bachelor's unchanged)
- Supports ~10 courses (adjustable)
- Courses display in order added
- Back side shows total course count

