# Implementation Plan — UWR Smart Course Finder & Enrollment Web App

This document outlines the architecture, design system, and technical implementation details for building a premium, modern, and responsive single-page course finder web application for **Unique World Robotics (UWR)**. 

The goal is to replace a generic contact form with an interactive, high-converting guided wizard that matches a child's age, experience, goals, and interests to the perfect UWR robotics and AI courses.

---

## Workspace Recommendation

> [!IMPORTANT]
> Since there is currently no active workspace set, we will create the project inside a dedicated subdirectory:
> `C:\Users\Ayaan Ansari\.gemini\antigravity\scratch\uwr-course-finder`
> 
> **Action Required**: Please open/set `C:\Users\Ayaan Ansari\.gemini\antigravity\scratch\uwr-course-finder` as your active workspace in your editor for the best experience.

---

## Design System & Aesthetics

To create a premium, state-of-the-art visual experience that wows parents at first glance, we will use modern CSS features:

- **Color Palette**:
  - **Primary Background**: Deep Navy Blue (`#060C14` to `#0E1A2F` gradient)
  - **Brand Accent / Highlight**: Sunset Orange & Amber Gold (`#F4A261` and `#E76F51`)
  - **Glassmorphism Base**: Semitransparent white (`rgba(255, 255, 255, 0.03)`) with a high backdrop filter blur (`20px`) and thin glowing borders (`rgba(255, 255, 255, 0.08)`).
  - **Text Colors**: Crisp White (`#FFFFFF`) for headers, muted ice blue (`#94A3B8`) for secondary copy.
- **Typography**:
  - Headings: `Outfit` (bold, geometric, tech-forward Google Font)
  - Body Text: `Plus Jakarta Sans` or `Inter` (highly legible, professional sans-serif)
- **Visual Enhancements**:
  - Ambient glowing background blobs behind cards using CSS filters.
  - Custom SVGs for all option cards (e.g., icons for "Robots & Mechanics", "Coding & Programming", "AI & Machine Learning", etc.).
  - Smooth micro-interactions: cards will lift slightly on hover, glow when selected, and have active tap scaling.
  - Seamless screen transitions: the quiz will slide or fade elegantly between steps.

---

## Step-by-Step Quiz Flow & Architecture

The application will be built as an interactive Single-Page Application (SPA) driven by a clean Javascript state machine. 

### Core State:
```javascript
const appState = {
  step: 1, // 1 to 5, then 'results', then 'enrollment', then 'success'
  answers: {
    ageRange: '',     // '5-7', '8-11', '12-15', '16+'
    experience: '',   // 'beginner', 'some-experience', 'intermediate', 'advanced'
    goal: '',         // 'fun', 'skills', 'compete-local', 'compete-intl'
    interests: [],    // Array of up to 2 selections
    schedule: '',     // 'weekdays', 'weekends', 'either'
  },
  parentDetails: {
    parentName: '',
    childName: '',
    phone: '',
    email: ''
  },
  recommendations: [] // Computed recommendations list
};
```

### Steps:
1. **Step 1: Age** — "How old is your future engineer?" (Single select)
2. **Step 2: Experience** — "What's their experience level?" (Single select)
3. **Step 3: Goal** — "What's the goal?" (Single select)
4. **Step 4: Interests** — "What are they most interested in?" (Multi-select, max 2, dynamic selection controls)
5. **Step 5: Schedule** — "When can they attend?" (Single select)

---

## Smart Recommendation Logic

We will model all **40+ courses** as a structured JSON dataset loaded in memory.
Each course will have:
- `id`: unique string identifier
- `name`: string
- `ageRange`: array of matched age groups (e.g. `['5-7']`, `['8-11']`, `['12-15']`)
- `duration`: e.g. "12 sessions × 1.5 hrs"
- `level`: `['beginner', 'intermediate', 'advanced']`
- `category`: e.g., `'Robotics'`, `'Coding'`, `'AI'`, `'Games'`, `'Electronics'`, `'3D Design'`, `'Drones'`
- `description`: brief summary
- `urlSlug`: string for `uniqueworldrobotics.com/course/[slug]`
- `tags`: array of tags to show on the card (e.g., `["AI", "Python"]`)

### Dynamic Filtering & Scoring Algorithm:
1. **Age Filter (Hard Limit)**: Only courses that explicitly support the selected age range will be considered.
   * *Special Case*: If `goal` is `'compete-local'` or `'compete-intl'`, or age is `'16+'`, prioritize **Competition Programs** (FLL Explore, FLL Challenge, FTC Competition).
   * *Special Case*: If it's the Spring/Camp period, consider the camps matching the age profile.
2. **Scoring System**: Courses in the filtered age bracket are ranked by matching weights:
   - **Interest Match (+3 points per interest)**: If the course category matches any selected interest.
   - **Experience Match (+2 points)**: If the course difficulty level matches the selected experience level.
   - **Goal Match (+2 points)**:
     * Exploring/Fun -> Focus on Creative/Design courses (e.g., 3D Tinkerer, Unity Game Maker).
     * Technical Skills -> Focus on core programming/electronics (e.g., Py Coder, Java, Embedded Systems).
     * Competition -> Focus on Spike Robotics, FTC, FLL.
3. **Selection**:
   - The course with the highest score becomes the **Primary Recommended Hero Course**.
   - The next two highest-scoring courses are displayed as **Alternative Recommendations**.
4. **AI-like Personalized Reason Generator**:
   - A highly engaging, customized sentence generated dynamically.
   - *Example*: *"Based on Noah's interests in Robots & Coding, we recommend Spike Robotics because it offers an interactive, hands-on path for an 8-11 year old with some experience to build real coding skills."*

---

## Proposed Directory & File Structure

We will organize the code cleanly inside `C:\Users\Ayaan Ansari\.gemini\antigravity\scratch\uwr-course-finder\`:

```
uwr-course-finder/
├── index.html        # Main HTML5 entry point with SEO meta tags
├── style.css         # Styling system (variables, glassmorphism, animations, responsive design)
├── courses.js        # Structured data for UWR courses and camps
├── app.js            # Main application controller, state machine, and recommendation logic
└── assets/           # Subdirectory for visual elements and images
    └── uwr-logo.svg  # SVGs / icons for UWR branding and UI
```

---

## Proposed Changes & Code Construction

### 1. [index.html](file:///C:/Users/Ayaan/Ansari/.gemini/antigravity/scratch/uwr-course-finder/index.html) [NEW]
- Semantic HTML structure.
- Header with progress bar and UWR logo/brand elements.
- Wizard step containers (`<section>` elements) that toggle visibility with hardware-accelerated transitions.
- Lead capture modal/container with accessible labels and custom validation.
- Responsive grids for results and options.

### 2. [style.css](file:///C:/Users/Ayaan/Ansari/.gemini/antigravity/scratch/uwr-course-finder/style.css) [NEW]
- **Variables**: Custom typography settings, shadow states, HSL color weights.
- **Glassmorphism CSS**: `.glass-card`, `.glass-input`, and backdrop-filter classes.
- **Animations**: Page fade-in, step slide-in (`@keyframes slideIn`), button pulse, and result reveal animations.
- **Responsiveness**: Media queries for standard smartphone viewports, tablet landscape, and desktop viewports.

### 3. [courses.js](file:///C:/Users/Ayaan/Ansari/.gemini/antigravity/scratch/uwr-course-finder/courses.js) [NEW]
- Expose a `UWR_COURSES` array containing high-fidelity definitions of UWR's course catalog. Let's make sure it contains the exact names, descriptions, tags, and UWR slugs for all 40+ courses.

### 4. [app.js](file:///C:/Users/Ayaan/Ansari/.gemini/antigravity/scratch/uwr-course-finder/app.js) [NEW]
- Main controller and state.
- Event listeners for interactive step items.
- Smart recommendation calculator.
- Lead submission handler (printing data to the console in a styled format).
- Animated step transitions using JS-driven CSS classes.

---

## Verification Plan

### Automated/Local Testing
1. **Interactive Flow Check**: Simulate quiz operations directly inside the browser.
2. **Logic Correctness Verification**: Check if:
   - Selecting Age 5-7 results only in Age 5-7 courses (e.g. Junior Robotics, Early Electronics).
   - Selecting "Compete internationally" leads to FLL/FTC competition tracks.
   - Selecting specific interests (e.g., "Games & Apps") prioritizes Unity Game Maker, Roblox, or Flutter App Developer.
3. **Lead Capturing**: Test form validations (phone format, email syntax, empty fields) and verify success screen transition.

### Manual Verification
- We will review the responsive layouts in the browser at different mobile screen widths (360px, 768px, 1024px, 1440px).

---

## Open Questions

> [!NOTE]
> 1. **UWR Logo**: We will create a beautiful modern inline SVG logo for UWR or fetch the official one to keep it lightweight. Do you have a specific SVG logo you would like us to use, or should we create a high-quality stylized SVG representing the brand?
> 2. **Course Slugs**: We will map the URLs based on the standard `uniqueworldrobotics.com/course/[slug]`. If a specific URL isn't exact, we'll design slugs that gracefully redirect or fall back to their homepage.
> 3. **Launch Date**: We noticed the Camp references "Dubai Spring Camp 2026". We will keep the copy futuristic and relevant for the upcoming camp seasons.

Please let me know if this plan matches your expectations so we can begin coding!
