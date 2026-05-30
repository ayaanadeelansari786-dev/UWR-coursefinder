/**
 * UWR Course Finder - Main Controller
 * Handles wizard flow, dynamic step validation, scoring engine, and lead capture.
 */

// Global Application State
const appState = {
  step: 1, // 1 to 5, then 'lead', 'results', 'success'
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
  selectedCourse: null, // Course selected for enrollment
  recommendations: [] // Ranked array of matching courses
};

// Map steps to human-readable progress info
const STEP_META = {
  1: { text: "Step 1 of 5: Age Group", percent: "20%" },
  2: { text: "Step 2 of 5: Tech Experience", percent: "40%" },
  3: { text: "Step 3 of 5: Primary Goal", percent: "60%" },
  4: { text: "Step 4 of 5: Special Interests", percent: "80%" },
  5: { text: "Step 5 of 5: Availability", percent: "100%" },
  'lead': { text: "Almost There!", percent: "100%" }
};

// ===========================================================================
// Airtable Integration (via /api/airtable serverless proxy)
// The API key lives in Vercel environment variables — never in the browser.
// ===========================================================================

/**
 * Sends enrollment data to Airtable via the /api/airtable serverless function.
 * @param {Object} data - The enrollment payload to save.
 */
async function saveEnrollmentToSheet(data) {
  try {
    const response = await fetch('/api/airtable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('[UWR] ✅ Enrollment saved to Airtable. Record ID:', result.id);
    } else {
      const err = await response.json();
      console.error('[UWR] ❌ Airtable proxy error:', err);
    }
  } catch (err) {
    console.error('[UWR] ❌ Failed to reach /api/airtable:', err);
  }
}

// ===========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initWizard();
});

/**
 * Initializes quiz handlers, inputs, and button click listeners.
 */
function initWizard() {
  // Explicitly enforce starting at Step 1 and clear answers/selected classes
  appState.step = 1;
  appState.answers.ageRange = '';
  appState.answers.experience = '';
  appState.answers.goal = '';
  appState.answers.interests = [];
  appState.answers.schedule = '';
  appState.selectedCourse = null;
  appState.recommendations = [];

  const allCards = document.querySelectorAll(".option-card");
  allCards.forEach(card => card.classList.remove("selected"));

  const sections = document.querySelectorAll(".step-section");
  sections.forEach(sec => {
    if (sec.id === 'step-1') {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Option Card Clicks
  const cards = document.querySelectorAll(".option-card");
  cards.forEach(card => {
    card.addEventListener("click", () => handleCardSelection(card));
  });

  // Navigation Buttons
  document.getElementById("btn-next").addEventListener("click", nextStep);
  document.getElementById("btn-prev").addEventListener("click", prevStep);
  
  // Restarts & Enrollment Clicks
  document.getElementById("btn-restart").addEventListener("click", resetQuiz);
  document.getElementById("btn-enroll-hero").addEventListener("click", () => {
    if (appState.recommendations.length > 0) {
      triggerEnrollment(appState.recommendations[0]);
    }
  });

  // Lead Form Input Listeners (clears invalid statuses upon typing)
  const inputs = document.querySelectorAll(".glass-input");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
    });
  });

  // Toggle All Other Courses Catalog
  const btnToggle = document.getElementById("btn-toggle-others");
  const othersContent = document.getElementById("others-content");
  if (btnToggle && othersContent) {
    btnToggle.addEventListener("click", () => {
      const isHidden = othersContent.style.display === "none";
      if (isHidden) {
        othersContent.style.display = "block";
        btnToggle.querySelector("span").textContent = "Hide Other Courses 📂";
        renderOthersFilters('All');
        renderOthersCatalog('All');
      } else {
        othersContent.style.display = "none";
        btnToggle.querySelector("span").textContent = "Explore Other UWR Courses 📂";
      }
    });
  }

  // Set initial button state
  updateNavigationUI();
}

/**
 * Handles clicks on interactive option cards.
 */
function handleCardSelection(cardElement) {
  const field = cardElement.getAttribute("data-field");
  const value = cardElement.getAttribute("data-value");
  
  if (cardElement.classList.contains("multi")) {
    // Multi-select handling (Step 4 - Interests)
    let selectedList = [...appState.answers[field]];
    
    if (selectedList.includes(value)) {
      // Toggle off
      selectedList = selectedList.filter(item => item !== value);
      cardElement.classList.remove("selected");
    } else {
      // Toggle on, max 2 selections
      if (selectedList.length < 2) {
        selectedList.push(value);
        cardElement.classList.add("selected");
      } else {
        // Shake animation as active feedback for limit breach
        cardElement.classList.add("shake-effect");
        setTimeout(() => cardElement.classList.remove("shake-effect"), 400);
        return;
      }
    }
    
    appState.answers[field] = selectedList;
    updateInterestsCounter();
  } else {
    // Single-select handling (Steps 1, 2, 3, 5)
    appState.answers[field] = value;
    
    // Toggle active classes on siblings
    const siblings = cardElement.parentElement.querySelectorAll(".option-card");
    siblings.forEach(sib => sib.classList.remove("selected"));
    cardElement.classList.add("selected");
    
    // Automatically advance on single selects for an extremely premium responsive feel
    // (We add a tiny delay of 250ms so user sees the active glow transition)
    if (appState.step < 5 && appState.step !== 4) {
      setTimeout(() => {
        nextStep();
      }, 250);
      return;
    }
  }

  updateNavigationUI();
}

/**
 * Updates the Step 4: Interests multi-select counter.
 */
function updateInterestsCounter() {
  const count = appState.answers.interests.length;
  const counterEl = document.getElementById("interests-counter");
  if (counterEl) {
    const textEl = counterEl.querySelector("span");
    textEl.innerHTML = `Please select 1 or 2 options. Selected: <strong>${count}/2</strong>`;
    
    if (count > 0) {
      counterEl.style.color = "var(--primary-orange)";
    } else {
      counterEl.style.color = "var(--text-muted)";
    }
  }
}

/**
 * Directs the wizard screen to the next step or handles calculations.
 */
function nextStep() {
  if (appState.step === 'success') return;

  if (appState.step === 5) {
    // Navigate from Step 5 to Lead Form
    transitionStep(5, 'lead');
    appState.step = 'lead';
  } else if (appState.step === 'lead') {
    // Validate lead capture before going to results
    if (validateLeadForm()) {
      captureLeadDetails();
      appState.recommendations = calculateRecommendations();
      renderRecommendations();
      transitionStep('lead', 'results');
      appState.step = 'results';
    }
  } else {
    // Default numeric steps
    const current = appState.step;
    if (current < 5) {
      transitionStep(current, current + 1);
      appState.step = current + 1;
    }
  }
  
  updateNavigationUI();
}

/**
 * Directs the wizard screen to the previous step.
 */
function prevStep() {
  if (appState.step === 1 || appState.step === 'success') return;

  if (appState.step === 'lead') {
    transitionStep('lead', 5);
    appState.step = 5;
  } else if (appState.step === 'results') {
    transitionStep('results', 'lead');
    appState.step = 'lead';
  } else {
    const current = appState.step;
    transitionStep(current, current - 1);
    appState.step = current - 1;
  }

  updateNavigationUI();
}

/**
 * Performs dynamic CSS translations between steps.
 */
function transitionStep(fromStep, toStep) {
  const fromEl = document.getElementById(fromStep === 'lead' ? 'step-lead' : fromStep === 'results' ? 'step-results' : `step-${fromStep}`);
  const toEl = document.getElementById(toStep === 'lead' ? 'step-lead' : toStep === 'results' ? 'step-results' : toStep === 'success' ? 'step-success' : `step-${toStep}`);

  if (fromEl && toEl) {
    fromEl.classList.remove("active");
    toEl.classList.add("active");
  }

  // Window scroll to top of wizard to ensure focus
  const wizardCard = document.getElementById("wizard-card");
  if (wizardCard) {
    wizardCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Updates wizard progress bars, header text, and button disability states.
 */
function updateNavigationUI() {
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const progressContainer = document.getElementById("progress-container");
  const wizardFooter = document.getElementById("wizard-footer");
  
  // Handle results/success full screen layout overrides
  if (appState.step === 'results' || appState.step === 'success') {
    if (progressContainer) progressContainer.style.display = "none";
    if (wizardFooter) wizardFooter.style.display = "none";
    return;
  } else {
    if (progressContainer) progressContainer.style.display = "block";
    if (wizardFooter) wizardFooter.style.display = "flex";
  }

  // Update Back Button Disability
  if (appState.step === 1) {
    btnPrev.setAttribute("disabled", "true");
  } else {
    btnPrev.removeAttribute("disabled");
  }

  // Verify if current step has answers loaded to enable "Continue"
  let isStepValid = false;
  if (appState.step >= 1 && appState.step <= 5) {
    if (appState.step === 1) isStepValid = !!appState.answers.ageRange;
    if (appState.step === 2) isStepValid = !!appState.answers.experience;
    if (appState.step === 3) isStepValid = !!appState.answers.goal;
    if (appState.step === 4) isStepValid = appState.answers.interests.length >= 1;
    if (appState.step === 5) isStepValid = !!appState.answers.schedule;
  } else if (appState.step === 'lead') {
    isStepValid = true; // Handled by inline form validation on click
  }

  if (isStepValid) {
    btnNext.removeAttribute("disabled");
  } else {
    btnNext.setAttribute("disabled", "true");
  }

  // Update Progress Tracker bar and text
  const meta = STEP_META[appState.step];
  if (meta) {
    document.getElementById("progress-text").textContent = meta.text;
    document.getElementById("progress-percent").textContent = `${meta.percent} Complete`;
    document.getElementById("progress-bar").style.width = meta.percent;
  }
}

/**
 * Validates the parent details form using robust regular expressions.
 */
function validateLeadForm() {
  let isValid = true;
  
  const parentName = document.getElementById("parentName");
  const childName = document.getElementById("childName");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");

  // Parent Name check
  if (!parentName.value.trim()) {
    parentName.classList.add("invalid");
    isValid = false;
  } else {
    parentName.classList.remove("invalid");
  }

  // Child Name check
  if (!childName.value.trim()) {
    childName.classList.add("invalid");
    isValid = false;
  } else {
    childName.classList.remove("invalid");
  }

  // Phone check (basic check: digits and length >= 7)
  const cleanPhone = phone.value.replace(/\D/g, '');
  if (cleanPhone.length < 7) {
    phone.classList.add("invalid");
    isValid = false;
  } else {
    phone.classList.remove("invalid");
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add("invalid");
    isValid = false;
  } else {
    email.classList.remove("invalid");
  }

  return isValid;
}

/**
 * Ingests parent form data into local state.
 */
function captureLeadDetails() {
  appState.parentDetails.parentName = document.getElementById("parentName").value.trim();
  appState.parentDetails.childName = document.getElementById("childName").value.trim();
  appState.parentDetails.phone = document.getElementById("phone").value.trim();
  appState.parentDetails.email = document.getElementById("email").value.trim();
}

/**
 * Smart recommendation calculation logic.
 * Employs a weighted matching algorithm.
 */
function calculateRecommendations() {
  const age = appState.answers.ageRange;
  const experience = appState.answers.experience;
  const goal = appState.answers.goal;
  const interests = appState.answers.interests;

  // 1. HARD FILTER: Age range match
  let matchedCourses = UWR_COURSES.filter(course => {
    return course.ageRange.includes(age);
  });

  // If no exact age match found, fall back to all courses (safety net)
  if (matchedCourses.length === 0) {
    matchedCourses = UWR_COURSES;
  }

  // 2. SCORING MATRIX
  const scoredList = matchedCourses.map(course => {
    let score = 0;

    // A. Interest Match (+3 per match)
    interests.forEach(interest => {
      if (course.category === interest) {
        score += 3;
      }
      // Tag match (+1.5 per match)
      const hasTag = course.tags.some(t => t.toLowerCase() === interest.toLowerCase());
      if (hasTag) {
        score += 1.5;
      }
    });

    // B. Experience level match (+2)
    if (course.level === experience) {
      score += 2;
    }

    // C. Goal Alignment match (+2)
    if (goal === 'fun') {
      // Focus on interactive games/3D or creative camps
      if (course.category === 'Games' || course.category === '3D Design' || course.tags.includes('Creativity') || course.tags.includes('Games')) {
        score += 2;
      }
    } else if (goal === 'skills') {
      // Focus on syntax programming, engineering systems, AI logic
      if (course.category === 'Coding' || course.category === 'Electronics' || course.category === 'AI') {
        score += 2;
      }
    } else if (goal === 'compete-local' || goal === 'compete-intl') {
      // Target tournament platforms
      if (course.tags.includes('Competition') || course.category === 'Robotics') {
        score += 2;
      }
    }

    // D. Boosters
    // Elite competition boosts
    if ((goal === 'compete-local' || goal === 'compete-intl') && course.tags.includes('Competition')) {
      score += 5;
    }
    // High-focus camps boosts
    if (interests.includes('Camps') && course.category === 'Camps') {
      score += 4;
    }

    return { course, score };
  });

  // Sort descending by score
  scoredList.sort((a, b) => b.score - a.score);

  // Return the mapped courses
  return scoredList.map(item => item.course);
}

/**
 * Generates high-fidelity personalized reason text for parents.
 */
function generateAIExplanation(primaryCourse) {
  const child = appState.parentDetails.childName;
  const parent = appState.parentDetails.parentName;
  const age = appState.answers.ageRange;
  const experience = appState.answers.experience;
  const goal = appState.answers.goal;
  
  const interestText = appState.answers.interests.map(i => {
    if (i === 'Robotics') return 'Robots & Mechanical Engineering';
    if (i === 'Coding') return 'Software Coding & Algorithm logic';
    if (i === 'Games') return 'Game Development & Asset Modding';
    if (i === 'AI') return 'Artificial Intelligence & Smart Tech';
    if (i === 'Electronics') return 'Electronics circuits & Hardware';
    if (i === '3D Design') return '3D CAD Modeling & Printing';
    if (i === 'Drones') return 'Drone Navigation & Flight physics';
    if (i === 'Camps') return 'Hands-on Bootcamp dynamics';
    return i;
  }).join(' combined with ');

  const expStr = {
    'beginner': 'an absolute beginner',
    'some-experience': 'having some foundational visual coding exposure',
    'intermediate': 'a structured intermediate builder',
    'advanced': 'an advanced-tier young developer'
  }[experience] || 'their skill level';

  const goalStr = {
    'fun': 'foster active creative learning while having fun assembling robotics systems',
    'skills': 'lay a robust technical foundation in modern core coding and electronic controls',
    'compete-local': 'gear up for excellence in national leagues and community innovation cups',
    'compete-intl': 'compete on elite world championship stages (FIRST Tech Challenge, VEX V5)'
  }[goal] || 'cultivate futuristic STEM skills';

  return `Based on <strong>${child}'s</strong> profile as <strong>${expStr}</strong> (Ages ${age}) with a keen interest in <strong>${interestText}</strong>, our intelligent curriculum matrix recommends <strong>${primaryCourse.name}</strong>. We selected this program because it provides a perfectly paced runway to <strong>${goalStr}</strong>. It embeds challenging, real-world engineering concepts within a highly collaborative atmosphere, forming the perfect launching pad for their robotic ambitions.`;
}

/**
 * Dynamic rendering of primary and alternate course cards.
 */
function renderRecommendations() {
  const primaryHeadline = document.getElementById("results-headline");
  primaryHeadline.innerHTML = `Great news, ${appState.parentDetails.parentName}!`;
  
  const childLabel = document.getElementById("results-headline").nextElementSibling;
  childLabel.textContent = `Here is the custom-tailored robotics and AI pathway mapped out for ${appState.parentDetails.childName}.`;

  const primary = appState.recommendations[0];
  if (!primary) return;

  // Render AI custom explanation
  const explanationBox = document.getElementById("results-rationale-box");
  explanationBox.innerHTML = generateAIExplanation(primary);

  // Render Primary Card
  document.getElementById("hero-course-name").textContent = primary.name;
  
  // Set Learn More link dynamically
  const learnMoreHero = document.getElementById("btn-learn-more-hero");
  if (learnMoreHero) {
    const defaultDomain = "https://uniqueworldrobotics.com/";
    learnMoreHero.setAttribute("href", primary.urlSlug ? defaultDomain + primary.urlSlug : defaultDomain);
  }
  
  // Render tags
  const tagsContainer = document.getElementById("hero-tags");
  tagsContainer.innerHTML = '';
  primary.tags.forEach((tag, idx) => {
    const span = document.createElement("span");
    span.className = `meta-tag ${idx === 0 ? 'special' : ''}`;
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  document.getElementById("hero-duration").textContent = primary.duration;
  
  const formattedLevel = primary.level.charAt(0).toUpperCase() + primary.level.slice(1).replace('-', ' ');
  document.getElementById("hero-level").textContent = formattedLevel;
  
  document.getElementById("hero-age-tag").textContent = `Ages ${primary.ageRange.join(', ')}`;
  document.getElementById("hero-desc").textContent = primary.description;

  // Render Alternate Cards (next 2 best matches)
  const alternates = appState.recommendations.slice(1, 3);
  const altsGrid = document.getElementById("alternatives-grid");
  const altsWrapper = document.getElementById("alternatives-wrapper");
  
  if (alternates.length === 0) {
    altsWrapper.style.display = "none";
  } else {
    altsWrapper.style.display = "block";
    altsGrid.innerHTML = '';
    
    alternates.forEach(course => {
      const formattedCourseLevel = course.level.charAt(0).toUpperCase() + course.level.slice(1).replace('-', ' ');
      const defaultDomain = "https://uniqueworldrobotics.com/";
      const courseLink = course.urlSlug ? defaultDomain + course.urlSlug : defaultDomain;
      
      const altCard = document.createElement("article");
      altCard.className = "alt-card";
      
      altCard.innerHTML = `
        <div class="alt-card-header">
          <h4 class="alt-card-title">${course.name}</h4>
          <div class="course-meta-tags">
            <span class="meta-tag special">${course.category}</span>
            <span class="meta-tag">Ages ${course.ageRange.join(', ')}</span>
            <span class="meta-tag">${formattedCourseLevel}</span>
          </div>
        </div>
        <p class="card-desc" style="text-align: left; margin-bottom: 16px; flex: 1;">${course.description}</p>
        <div style="display: flex; gap: 10px; width: 100%; flex-wrap: wrap;">
          <a href="${courseLink}" target="_blank" rel="noopener" class="btn btn-secondary" style="flex: 1; border-radius: 20px; font-size: 13px; padding: 10px 12px; justify-content: center; text-decoration: none; min-width: 100px;">
            <span>Learn More</span>
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px;"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </a>
          <button class="btn btn-secondary btn-enroll-alt" data-id="${course.id}" style="flex: 1.2; border-radius: 20px; font-size: 13px; padding: 10px 12px; background: rgba(255,255,255,0.05); justify-content: center; min-width: 110px;">
            <span>Request Details</span>
          </button>
        </div>
      `;
      
      altsGrid.appendChild(altCard);
    });

    // Attach listeners to newly generated alternate request buttons
    const altEnrollBtns = document.querySelectorAll(".btn-enroll-alt");
    altEnrollBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const courseId = btn.getAttribute("data-id");
        const matchedAlt = UWR_COURSES.find(c => c.id === courseId);
        if (matchedAlt) {
          triggerEnrollment(matchedAlt);
        }
      });
    });
  }
}

/**
 * Generates and renders dynamic filter tabs for the other courses catalog.
 */
function renderOthersFilters(activeCategory = 'All') {
  const filterContainer = document.getElementById("others-filters");
  if (!filterContainer) return;
  filterContainer.innerHTML = '';
  
  const categories = ['All', 'Robotics', 'Coding', 'AI', 'Electronics', '3D Design', 'Drones', 'Games', 'Camps'];
  
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `btn ${cat === activeCategory ? 'btn-primary' : 'btn-secondary'}`;
    btn.style.borderRadius = "20px";
    btn.style.fontSize = "12px";
    btn.style.padding = "6px 14px";
    btn.innerHTML = `<span>${cat}</span>`;
    
    btn.addEventListener("click", () => {
      renderOthersFilters(cat);
      renderOthersCatalog(cat);
    });
    
    filterContainer.appendChild(btn);
  });
}

/**
 * Dynamic rendering of organized other courses.
 */
function renderOthersCatalog(activeCategory = 'All') {
  const primaryId = appState.recommendations[0]?.id;
  const altIds = appState.recommendations.slice(1, 3).map(c => c.id);
  
  // Filter out primary and alternates
  let list = UWR_COURSES.filter(c => c.id !== primaryId && !altIds.includes(c.id));
  
  // Filter by category if not 'All'
  if (activeCategory !== 'All') {
    list = list.filter(c => c.category === activeCategory);
  }
  
  const grid = document.getElementById("others-grid");
  if (!grid) return;
  grid.innerHTML = '';
  
  const ageGroups = [
    { key: '5-7', label: '👦 Ages 5 - 7 (Junior Creators)' },
    { key: '8-11', label: '🧑 Ages 8 - 11 (Young Explorers)' },
    { key: '12-15', label: '👨 Ages 12 - 15 (Teen Techies)' },
    { key: '16+', label: '🚀 Ages 16+ (Future Innovators)' }
  ];
  
  let hasAnyCourses = false;
  
  ageGroups.forEach(group => {
    const groupCourses = list.filter(c => c.ageRange.includes(group.key));
    if (groupCourses.length > 0) {
      hasAnyCourses = true;
      
      // Age Group Header
      const sectionHeader = document.createElement("div");
      sectionHeader.className = "others-age-header";
      sectionHeader.innerHTML = `<h4>${group.label}</h4>`;
      grid.appendChild(sectionHeader);
      
      // Grid for this group
      const subGrid = document.createElement("div");
      subGrid.className = "others-subgrid";
      
      groupCourses.forEach(course => {
        const formattedLevel = course.level.charAt(0).toUpperCase() + course.level.slice(1).replace('-', ' ');
        const defaultDomain = "https://uniqueworldrobotics.com/";
        const courseLink = course.urlSlug ? defaultDomain + course.urlSlug : defaultDomain;
        
        const card = document.createElement("article");
        card.className = "alt-card other-course-card";
        card.style.padding = "20px";
        card.style.gap = "12px";
        
        card.innerHTML = `
          <div class="alt-card-header">
            <h5 class="alt-card-title" style="font-size: 16px; font-weight: 600;">${course.name}</h5>
            <div class="course-meta-tags" style="gap: 4px;">
              <span class="meta-tag special" style="font-size: 11px; padding: 2px 6px;">${course.category}</span>
              <span class="meta-tag" style="font-size: 11px; padding: 2px 6px;">Ages ${course.ageRange.join(', ')}</span>
              <span class="meta-tag" style="font-size: 11px; padding: 2px 6px;">${formattedLevel}</span>
            </div>
          </div>
          <p class="card-desc" style="font-size: 13px; text-align: left; margin-bottom: 8px; flex: 1; line-height: 1.4;">${course.description}</p>
          <div style="display: flex; gap: 8px; width: 100%; flex-wrap: wrap;">
            <a href="${courseLink}" target="_blank" rel="noopener" class="btn btn-secondary" style="flex: 1; border-radius: 20px; font-size: 12px; padding: 8px 10px; justify-content: center; text-decoration: none; min-width: 85px;">
              <span>Learn More</span>
            </a>
            <button class="btn btn-primary btn-enroll-other" data-id="${course.id}" style="flex: 1.2; border-radius: 20px; font-size: 12px; padding: 8px 10px; justify-content: center; min-width: 100px;">
              <span>Select & Enroll</span>
            </button>
          </div>
        `;
        subGrid.appendChild(card);
      });
      grid.appendChild(subGrid);
    }
  });
  
  if (!hasAnyCourses) {
    grid.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 40px 0; width: 100%;">No other courses found in this category.</div>';
  }
  
  // Attach listeners to newly generated other select buttons
  const otherEnrollBtns = document.querySelectorAll(".btn-enroll-other");
  otherEnrollBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const courseId = btn.getAttribute("data-id");
      const matchedCourse = UWR_COURSES.find(c => c.id === courseId);
      if (matchedCourse) {
        triggerEnrollment(matchedCourse);
      }
    });
  });
}

/**
 * Triggers state change into success confirmation screen.
 * Also fires the Google Sheets save.
 */
function triggerEnrollment(course) {
  appState.selectedCourse = course;
  
  // Generate a random high-fidelity confirmation ID
  const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
  const confirmId = `UWR-${randomHex}`;

  // Populate Success Page Text
  document.getElementById("success-parent-name").textContent = appState.parentDetails.parentName;
  document.getElementById("success-child-name").textContent = appState.parentDetails.childName;
  document.getElementById("success-phone").textContent = appState.parentDetails.phone;
  
  document.getElementById("success-course-name").textContent = course.name;
  
  const schedText = appState.answers.schedule === 'weekdays' ? 'Weekday Afternoons' : 
                    appState.answers.schedule === 'weekends' ? 'Weekend Batches' : 'Flexible/Either';
  document.getElementById("success-schedule").textContent = schedText;
  document.getElementById("success-age").textContent = `Ages ${appState.answers.ageRange}`;
  document.getElementById("success-id").textContent = confirmId;

  // Build enrollment payload
  const enrollmentPayload = {
    confirmationId: confirmId,
    timestamp: new Date().toISOString(),
    parentName: appState.parentDetails.parentName,
    childName: appState.parentDetails.childName,
    phone: appState.parentDetails.phone,
    email: appState.parentDetails.email,
    selectedCourse: course.name,
    courseId: course.id,
    ageRange: appState.answers.ageRange,
    experienceLevel: appState.answers.experience,
    primaryGoal: appState.answers.goal,
    interests: appState.answers.interests.join(', '),
    schedulePreference: schedText
  };

  // 🔥 Save to Google Sheet
  saveEnrollmentToSheet(enrollmentPayload);

  // Log full captured payload in a styled premium console format
  console.log(
    `%c[UWR ENROLLMENT CAPTURED]%c\n` + 
    `--------------------------------------\n` +
    `Lead ID:       ${confirmId}\n` +
    `Parent Name:   ${appState.parentDetails.parentName}\n` +
    `Child Name:    ${appState.parentDetails.childName}\n` +
    `Phone:         ${appState.parentDetails.phone}\n` +
    `Email:         ${appState.parentDetails.email}\n` +
    `Selected:      ${course.name} (${course.id})\n` +
    `Age Range:     ${appState.answers.ageRange}\n` +
    `Experience:    ${appState.answers.experience}\n` +
    `Goal Chosen:   ${appState.answers.goal}\n` +
    `Schedule Pref: ${appState.answers.schedule}\n` +
    `--------------------------------------`,
    "color: #F4A261; font-weight: bold; font-size: 14px;",
    "color: #94A3B8; font-size: 12px;"
  );

  // Transition Step
  transitionStep('results', 'success');
  appState.step = 'success';
  updateNavigationUI();
}

/**
 * Resets application states and transitions back to Step 1.
 */
function resetQuiz() {
  const currentStep = appState.step;
  
  // Clear Answers and Inputs
  appState.step = 1;
  appState.answers.ageRange = '';
  appState.answers.experience = '';
  appState.answers.goal = '';
  appState.answers.interests = [];
  appState.answers.schedule = '';
  appState.selectedCourse = null;
  appState.recommendations = [];
  
  appState.parentDetails.parentName = '';
  appState.parentDetails.childName = '';
  appState.parentDetails.phone = '';
  appState.parentDetails.email = '';

  // Clear Form Fields
  document.getElementById("parentName").value = '';
  document.getElementById("childName").value = '';
  document.getElementById("phone").value = '';
  document.getElementById("email").value = '';

  // Reset selected classes on option cards
  const allCards = document.querySelectorAll(".option-card");
  allCards.forEach(card => card.classList.remove("selected"));

  // Reset counters
  updateInterestsCounter();

  // Clear invalid states
  const inputs = document.querySelectorAll(".glass-input");
  inputs.forEach(input => input.classList.remove("invalid"));

  // Reset Others section
  const othersContent = document.getElementById("others-content");
  if (othersContent) othersContent.style.display = "none";
  const btnToggle = document.getElementById("btn-toggle-others");
  if (btnToggle) btnToggle.querySelector("span").textContent = "Explore Other UWR Courses 📂";

  // Transition back to step 1
  transitionStep(currentStep, 1);
  
  updateNavigationUI();
}
