/**
 * UWR Course Catalog - Official Database
 * Loaded with 51 official courses, camps, and competition tracks from UWR_Course_Links.docx
 */

const UWR_COURSES = [
  // ==================== 5-7 YEARS ====================
  {
    id: "junior-robotics-5-7",
    name: "Junior Robotics",
    ageRange: ["5-7"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "Robotics",
    description: "Introduce young learners to motorized structures and spatial engineering using simple block robotic assemblies.",
    urlSlug: "course/junior-robotics/",
    tags: ["Robotics", "LEGO", "Ages 5-7", "TACTILE"]
  },
  {
    id: "early-electronics-5-7",
    name: "Early Electronics",
    ageRange: ["5-7"],
    duration: "10 sessions × 1.5 hrs",
    level: "beginner",
    category: "Electronics",
    description: "Safely investigate basic electric currents, snap boards, lights, and switches with high physical interaction.",
    urlSlug: "course/early-electronics/",
    tags: ["Electronics", "Circuits", "Ages 5-7", "HANDS-ON"]
  },
  {
    id: "code-maker-basic",
    name: "Code Maker – Basic Level",
    ageRange: ["5-7"],
    duration: "12 sessions × 1.25 hrs",
    level: "beginner",
    category: "Coding",
    description: "Build simple interactive animated stories and sequence logical patterns in drag-and-drop screen layouts.",
    urlSlug: "course/code-maker-basic-level/",
    tags: ["Coding", "Block Coding", "ScratchJr", "Ages 5-7"]
  },
  {
    id: "code-maker-advanced",
    name: "Code Maker – Advanced Level",
    ageRange: ["5-7"],
    duration: "12 sessions × 1.25 hrs",
    level: "intermediate",
    category: "Coding",
    description: "Master complex storytelling controls, multiple loops, and coordinate actions using ScratchJr block structures.",
    urlSlug: "course/code-maker-advanced-level/",
    tags: ["Coding", "Block Coding", "ScratchJr", "Ages 5-7"]
  },

  // ==================== 8-11 YEARS ====================
  {
    id: "junior-robotics-8-11",
    name: "Junior Robotics",
    ageRange: ["8-11"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "Robotics",
    description: "Learn intermediate mechanical structures, gears, axles, and program autonomous sequences with active LEGO sensors.",
    urlSlug: "course/junior-robotics-2/",
    tags: ["Robotics", "LEGO", "Ages 8-11", "GEARS"]
  },
  {
    id: "early-electronics-8-11",
    name: "Early Electronics",
    ageRange: ["8-11"],
    duration: "10 sessions × 1.5 hrs",
    level: "beginner",
    category: "Electronics",
    description: "Investigate advanced circuit board assemblies, digital inputs, and analog component combinations.",
    urlSlug: "course/early-electronics-2/",
    tags: ["Electronics", "Circuits", "Ages 8-11", "HARDWARE"]
  },
  {
    id: "ai-coder-jr-basic",
    name: "AI Coder Junior – Basic",
    ageRange: ["8-11"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "AI",
    description: "Work with drag-and-drop blocks to introduce basic computer vision, speech recognition, and neural image models.",
    urlSlug: "course/ai-coder-junior-basic/",
    tags: ["AI", "Coding", "Block Coding", "Ages 8-11"]
  },
  {
    id: "ai-coder-jr-advanced",
    name: "AI Coder Junior – Advanced",
    ageRange: ["8-11"],
    duration: "12 sessions × 1.5 hrs",
    level: "intermediate",
    category: "AI",
    description: "Model custom machine learning estimators and incorporate facial or gestural markers into visual gaming projects.",
    urlSlug: "course/ai-coder-junior-advanced/",
    tags: ["AI", "Coding", "Block Coding", "Ages 8-11"]
  },
  {
    id: "spike-robotics",
    name: "Spike Robotics",
    ageRange: ["8-11"],
    duration: "16 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Robotics",
    description: "Program complex sensor triggers, automated steering systems, and construct robust LEGO mechanisms in teams.",
    urlSlug: "course/spike-robotics/",
    tags: ["Robotics", "LEGO", "Spike Prime", "Ages 8-11"]
  },
  {
    id: "py-coder-jr",
    name: "Py Coder Junior",
    ageRange: ["8-11"],
    duration: "14 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Coding",
    description: "Transition from visual blocks to text. Master standard syntax, loops, variables, and output rendering.",
    urlSlug: "course/py-coder-junior/",
    tags: ["Python", "Coding", "Text Coding", "Ages 8-11"]
  },
  {
    id: "app-maker-8-11",
    name: "App Maker",
    ageRange: ["8-11"],
    duration: "12 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Coding",
    description: "Build and deploy interactive mobile utility and game applications on active mobile simulators.",
    urlSlug: "course/app-maker/",
    tags: ["Apps", "Coding", "Mobile", "Ages 8-11"]
  },
  {
    id: "embedded-system-maker-basic",
    name: "Embedded System Maker – Basic Level",
    ageRange: ["8-11"],
    duration: "14 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Electronics",
    description: "Program simple microchips to read real-world environmental signals and power output LED arrays.",
    urlSlug: "course/embedded-system-maker-basic-level/",
    tags: ["Electronics", "Hardware", "Microchips", "Ages 8-11"]
  },
  {
    id: "embedded-system-maker-advanced",
    name: "Embedded System Maker – Advanced Level",
    ageRange: ["8-11", "12-15"],
    duration: "16 sessions × 1.5 hrs",
    level: "advanced",
    category: "Electronics",
    description: "Weld complex sensor pathways, configure radio controls, and design reactive electronic prototype platforms.",
    urlSlug: "course/embedded-system-maker-advanced-level/",
    tags: ["Electronics", "Hardware", "Arduino", "Ages 8-15"]
  },
  {
    id: "ai-robotics-8-11",
    name: "AI Robotics",
    ageRange: ["8-11"],
    duration: "14 sessions × 1.75 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Integrate computer vision models on camera-equipped rovers to enable track-tracing and face-steered navigation.",
    urlSlug: "course/ai-robotics/",
    tags: ["Robotics", "AI", "Computer Vision", "Ages 8-11"]
  },
  {
    id: "spike-pyrobotics-8-11",
    name: "Spike PyRobotics",
    ageRange: ["8-11"],
    duration: "16 sessions × 1.75 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Program autonomous LEGO Spike Prime models using raw Python scripts instead of drag-and-drop blocks.",
    urlSlug: "course/spike-pyrobotics/",
    tags: ["Robotics", "LEGO", "Python", "Ages 8-11"]
  },
  {
    id: "3d-tinkerer-8-11",
    name: "3D Tinkerer",
    ageRange: ["8-11"],
    duration: "10 sessions × 1.5 hrs",
    level: "beginner",
    category: "3D Design",
    description: "Develop spatial designs and model toys, spaceships, or custom parts using Tinkercad's geometric shapes.",
    urlSlug: "course/3d-tinkerer/",
    tags: ["3D Design", "CAD", "Tinkercad", "Ages 8-11"]
  },

  // ==================== 12-15 YEARS (Includes 16+ Advanced Mappings) ====================
  {
    id: "py-coder-basic",
    name: "Py Coder – Basic Level",
    ageRange: ["12-15"],
    duration: "14 sessions × 1.5 hrs",
    level: "beginner",
    category: "Coding",
    description: "Master basic Python syntax, variables, lists, standard conditionals, and build custom text console projects.",
    urlSlug: "course/py-coder-basic-level/",
    tags: ["Python", "Coding", "Text Coding", "Ages 12-15"]
  },
  {
    id: "py-coder-advanced",
    name: "Py Coder – Advanced Level",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "advanced",
    category: "Coding",
    description: "Explore object-oriented patterns, local file parsing, standard libraries, and write highly efficient data sorting scripts.",
    urlSlug: "course/py-coder-advanced-level/",
    tags: ["Python", "Coding", "OOP", "Ages 12-18"]
  },
  {
    id: "java-coder-basic",
    name: "Java Coder – Basic Level",
    ageRange: ["12-15"],
    duration: "14 sessions × 1.5 hrs",
    level: "beginner",
    category: "Coding",
    description: "Transition to compiled, typed languages. Master fundamental variable scopes, conditionals, loops, and terminal arrays.",
    urlSlug: "course/java-coder-basic-level/",
    tags: ["Java", "Coding", "Ages 12-15"]
  },
  {
    id: "java-coder-advanced",
    name: "Java Coder – Advanced Level",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "advanced",
    category: "Coding",
    description: "Build robust algorithmic backend systems using multi-class inheritances, advanced arrays, and exception catchers.",
    urlSlug: "course/java-coder-advanced-level/",
    tags: ["Java", "Coding", "OOP", "Ages 12-18"]
  },
  {
    id: "flutter-app-basic",
    name: "Flutter App Developer – Basic Level",
    ageRange: ["12-15"],
    duration: "16 sessions × 2 hrs",
    level: "beginner",
    category: "Coding",
    description: "Structure single-page cross-platform mobile apps for Android and iOS using Dart templates and widgets.",
    urlSlug: "course/flutter-app-developer-basic-level/",
    tags: ["Apps", "Flutter", "Dart", "Ages 12-15"]
  },
  {
    id: "flutter-app-advanced",
    name: "Flutter App Developer – Advanced Level",
    ageRange: ["12-15", "16+"],
    duration: "18 sessions × 2 hrs",
    level: "advanced",
    category: "Coding",
    description: "Code dynamic, multi-page mobile applications with active online state handlers, database queries, and custom graphic cards.",
    urlSlug: "course/flutter-app-developer-advanced-level/",
    tags: ["Apps", "Flutter", "Dart", "Ages 12-18"]
  },
  {
    id: "app-maker-mit-basic",
    name: "App Maker – Basic Level (MIT App Inventor)",
    ageRange: ["12-15"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "Coding",
    description: "Understand visual logical systems to build mobile tools using drag-and-drop interfaces with mobile screen components.",
    urlSlug: "course/app-maker-basic-level-mit-app-inventor/",
    tags: ["Apps", "Coding", "Visual Coding", "Ages 12-15"]
  },
  {
    id: "app-maker-mit-advanced",
    name: "App Maker – Advanced Level (MIT App Inventor)",
    ageRange: ["12-15", "16+"],
    duration: "14 sessions × 1.5 hrs",
    level: "advanced",
    category: "Coding",
    description: "Link local smartphone sensors to web databases and build reactive apps using advanced list controls and triggers.",
    urlSlug: "course/app-maker-advanced-level-mit-app-inventor/",
    tags: ["Apps", "Coding", "Ages 12-18"]
  },
  {
    id: "app-maker-ai-powered",
    name: "App Maker – AI Powered App",
    ageRange: ["12-15", "16+"],
    duration: "14 sessions × 1.5 hrs",
    level: "intermediate",
    category: "AI",
    description: "Embed machine learning classifiers, voice transcribers, or face detection blocks inside active mobile apps.",
    urlSlug: "course/app-maker-ai-powered-app/",
    tags: ["AI", "Apps", "Coding", "Ages 12-18"]
  },
  {
    id: "future-intelligence-ai",
    name: "Future Intelligence (AI)",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "intermediate",
    category: "AI",
    description: "Master the mechanics of neural networks, natural language processing, and train prediction estimators in the cloud.",
    urlSlug: "course/future-intelligence-ai/",
    tags: ["AI", "Neural Networks", "Data", "Ages 12-18"]
  },
  {
    id: "ai-robotics-quarky",
    name: "AI Robotics (Quarky)",
    ageRange: ["12-15", "16+"],
    duration: "18 sessions × 2 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Model advanced computer vision systems on metal-chassis robots using optical camera blocks and sensors.",
    urlSlug: "course/ai-robotics-quarky/",
    tags: ["Robotics", "AI", "Quarky", "Ages 12-18"]
  },
  {
    id: "unity-game-maker",
    name: "Unity Game Maker",
    ageRange: ["12-15", "16+"],
    duration: "20 sessions × 2 hrs",
    level: "intermediate",
    category: "Games",
    description: "Master Unity Editor scripts and write C# controllers to configure realistic gravity, lighting, and action scenes.",
    urlSlug: "course/unity-game-maker/",
    tags: ["Games", "Unity", "C#", "Ages 12-18"]
  },
  {
    id: "roblox-gamified-basic",
    name: "Roblox Gamified – Basic Level",
    ageRange: ["12-15"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "Games",
    description: "Design multiplayer obstacle courses (Obbies), design structures, and script environment reactions using Roblox Studio Lua.",
    urlSlug: "course/roblox-gamified-basic-level-roblox-studio/",
    tags: ["Games", "Roblox", "Lua", "Ages 12-15"]
  },
  {
    id: "roblox-gamified-advanced",
    name: "Roblox Gamified – Advanced Level",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "advanced",
    category: "Games",
    description: "Code dynamic global systems, custom player item shops, and publish multi-stage platformers directly to Roblox.",
    urlSlug: "course/roblox-gamified-advanced-level-roblox-studio/",
    tags: ["Games", "Roblox", "Lua", "Ages 12-18"]
  },
  {
    id: "python-gamified-pygame",
    name: "Python Gamified (PyGame)",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "intermediate",
    category: "Games",
    description: "Create pixel-perfect retro arcade games while learning keyboard controls, event loops, and physical velocity math.",
    urlSlug: "course/python-gamified-pygame/",
    tags: ["Games", "Python", "Pygame", "Ages 12-18"]
  },
  {
    id: "ar-vr-gamified",
    name: "AR/VR Gamified",
    ageRange: ["12-15", "16+"],
    duration: "14 sessions × 2 hrs",
    level: "advanced",
    category: "Games",
    description: "Build interactive virtual environments and immersive headsets applications using specialized spatial coding.",
    urlSlug: "course/ar-vr-gamified/",
    tags: ["Games", "AR/VR", "WebXR", "Ages 12-18"]
  },
  {
    id: "embedded-system-arduino-basic",
    name: "Embedded System Maker – Basic Level (Arduino)",
    ageRange: ["12-15"],
    duration: "14 sessions × 1.5 hrs",
    level: "beginner",
    category: "Electronics",
    description: "Write basic C++ microcode to blink LEDs, read temperature analog inputs, and control physical motor outputs.",
    urlSlug: "course/embedded-system-maker-basic-level-arduino/",
    tags: ["Electronics", "Arduino", "Hardware", "Ages 12-15"]
  },
  {
    id: "embedded-system-arduino-advanced",
    name: "Embedded System Maker – Advanced Level (Arduino)",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "advanced",
    category: "Electronics",
    description: "Calibrate multi-axis gyroscope sensors, compile complex system libraries, and design advanced custom electronics.",
    urlSlug: "course/embedded-system-maker-advanced-level-arduino/",
    tags: ["Electronics", "Arduino", "Hardware", "Ages 12-18"]
  },
  {
    id: "iot-creator-basic",
    name: "IoT Creator – Basic Level",
    ageRange: ["12-15"],
    duration: "12 sessions × 2 hrs",
    level: "beginner",
    category: "Electronics",
    description: "Bridge hardware to the cloud. Program wireless microchips to feed real-time sensor metrics to online cloud dashboards.",
    urlSlug: "course/iot-creator-basic-level/",
    tags: ["Electronics", "IoT", "WiFi Chips", "Ages 12-15"]
  },
  {
    id: "iot-creator-advanced",
    name: "IoT Creator – Advanced Level",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 2 hrs",
    level: "advanced",
    category: "Electronics",
    description: "Coordinate wireless microchips to trigger mesh systems, set remote push notices, and control household switches.",
    urlSlug: "course/iot-creator-advanced-level/",
    tags: ["Electronics", "IoT", "Smart Cities", "Ages 12-18"]
  },
  {
    id: "drone-maker-pluto",
    name: "Drone Maker (Pluto)",
    ageRange: ["12-15", "16+"],
    duration: "12 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Drones",
    description: "Discover flight physics, aerodynamics, and program lightweight Pluto nano-drones to complete autonomous obstacle loops.",
    urlSlug: "course/drone-maker-pluto/",
    tags: ["Drones", "Pluto", "Aerospace", "Ages 12-18"]
  },
  {
    id: "tinker-robotics-basic",
    name: "Tinker Robotics – Basic Level (TinkerCAD Circuits)",
    ageRange: ["12-15"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "Electronics",
    description: "Simulate complex electronic wiring, microchips, and test written code safely in a virtual computer sandbox.",
    urlSlug: "course/tinker-robotics-basic-level-tinkercad-circuits/",
    tags: ["Electronics", "Circuits", "Tinkercad", "Ages 12-15"]
  },
  {
    id: "3d-designer-freecad-basic",
    name: "3D Designer – Basic Level (FreeCAD)",
    ageRange: ["12-15"],
    duration: "12 sessions × 1.5 hrs",
    level: "beginner",
    category: "3D Design",
    description: "Master standard mechanical drafting rules and model high-precision product designs from scratch in FreeCAD.",
    urlSlug: "course/3d-designer-basic-level-freecad/",
    tags: ["3D Design", "CAD", "FreeCAD", "Ages 12-15"]
  },
  {
    id: "3d-designer-freecad-advanced",
    name: "3D Designer – Advanced Level (FreeCAD)",
    ageRange: ["12-15", "16+"],
    duration: "14 sessions × 1.5 hrs",
    level: "advanced",
    category: "3D Design",
    description: "Draft interlocking assemblies, engineer custom tolerance structural joints, and export prints for 3D printer slicers.",
    urlSlug: "course/3d-designer-advanced-level-freecad/",
    tags: ["3D Design", "CAD", "3D Printing", "Ages 12-18"]
  },
  {
    id: "spike-pyrobotics-12-15-basic",
    name: "Spike PyRobotics – Basic Level (LEGO Spike Prime + Python)",
    ageRange: ["12-15"],
    duration: "14 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Robotics",
    description: "Structure robotic motors, program line track layouts, and read sensor arrays using standard Python libraries.",
    urlSlug: "course/spike-pyrobotics-basic-level-lego-spike-prime-python/",
    tags: ["Robotics", "LEGO", "Python", "Ages 12-15"]
  },
  {
    id: "spike-pyrobotics-12-15-advanced",
    name: "Spike PyRobotics – Advanced Level (LEGO Spike Prime + Python)",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 1.75 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Deploy spatial coordinate maps, self-correcting gyro navigation, and complex multivariable filters in raw Python.",
    urlSlug: "course/spike-pyrobotics-advanced-level-lego-spike-prime-python/",
    tags: ["Robotics", "LEGO", "Python", "Ages 12-18"]
  },
  {
    id: "industrial-automation-dobot-basic",
    name: "Industrial Automation – Basic Level (Dobot)",
    ageRange: ["12-15"],
    duration: "14 sessions × 1.5 hrs",
    level: "intermediate",
    category: "Robotics",
    description: "Operate high-performance Dobot robotic arms. Program picker controls, laser coordinates, and conveyor flows.",
    urlSlug: "course/industrial-automation-basic-level-dobot/",
    tags: ["Robotics", "Automation", "Dobot", "Ages 12-15"]
  },
  {
    id: "industrial-automation-dobot-advanced",
    name: "Industrial Automation – Advanced Level (Dobot)",
    ageRange: ["12-15", "16+"],
    duration: "16 sessions × 1.75 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Construct assembly line models incorporating sorting loops, dynamic color sensors, and automated safety switches.",
    urlSlug: "course/industrial-automation-advanced-level-dobot/",
    tags: ["Robotics", "Automation", "Dobot", "Ages 12-18"]
  },
  {
    id: "robotic-manipulator",
    name: "Robotic Manipulator",
    ageRange: ["12-15", "16+"],
    duration: "24 sessions × 1.5 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Model multi-axis physical joint structures and design algorithms to calculate robotic lift dynamics (36-hour elite track).",
    urlSlug: "course/robotic-manipulator/",
    tags: ["Robotics", "Mechanical Design", "Ages 12-18"]
  },
  {
    id: "humanoid-robo-maker",
    name: "Humanoid Robo Maker",
    ageRange: ["12-15", "16+"],
    duration: "24 sessions × 1.5 hrs",
    level: "advanced",
    category: "Robotics",
    description: "Code active humanoid robotics to complete balancing scripts, steps coordination, and react to physical falls (36-hour elite track).",
    urlSlug: "course/humanoid-robo-maker/",
    tags: ["Robotics", "Humanoid", "Bipedal", "Ages 12-18"]
  },
  {
    id: "rpi-creator-advanced",
    name: "RPi Creator – Advanced Level (Raspberry Pi)",
    ageRange: ["12-15", "16+"],
    duration: "14 sessions × 2 hrs",
    level: "advanced",
    category: "Electronics",
    description: "Configure headless Raspberry Pi Linux servers, coordinate hardware interfaces, and host local IoT servers.",
    urlSlug: "course/rpi-creator-advanced-level-raspberry-pi/",
    tags: ["Electronics", "Raspberry Pi", "Linux", "Ages 12-18"]
  },

  // ==================== COMPETITION TRACKS ====================
  {
    id: "fll-explore-training",
    name: "FLL Explore Training",
    ageRange: ["5-7", "8-11"], // Ages 6-10
    duration: "8–12 weeks (Ages 6-10)",
    level: "intermediate",
    category: "Robotics",
    description: "Prepare for FIRST LEGO League Explore. Team up to construct a motorized model and craft a visual engineering research poster.",
    urlSlug: "competition/first-lego-league-explore-fll-explore-training/",
    tags: ["Competition", "Robotics", "LEGO", "FLL", "Ages 6-10"]
  },
  {
    id: "fll-challenge-training",
    name: "FLL Challenge Training",
    ageRange: ["8-11", "12-15"], // Ages 9-14
    duration: "12–16 weeks (Ages 9-14)",
    level: "advanced",
    category: "Robotics",
    description: "Code autonomous LEGO Spike Challenge rovers to run board missions and present a comprehensive innovative science solution.",
    urlSlug: "competition/first-lego-league-challenge-fll-challenge-training/",
    tags: ["Competition", "Robotics", "LEGO", "FLL", "Ages 9-14"]
  },
  {
    id: "ftc-competition-training",
    name: "FTC Competition Training",
    ageRange: ["12-15", "16+"], // Ages 13-18
    duration: "16–24 weeks (Ages 13-18)",
    level: "advanced",
    category: "Robotics",
    description: "Elite industrial-grade metal robotics. Engineer tournament chassis, weld custom components, and script advanced PID logic in Java.",
    urlSlug: "competition/first-tech-challenge-ftc-competition-training/",
    tags: ["Competition", "Robotics", "Java", "FTC", "Ages 13-18"]
  },

  // ==================== CAMPS ====================
  {
    id: "future-tech-spring-camp-dubai",
    name: "Future Tech Spring Camp Dubai 2026 – AI & Robotics",
    ageRange: ["12-15"], // Ages 12-15
    duration: "8 Days (Ages 12-15)",
    level: "intermediate",
    category: "Camps",
    description: "8-Day Spring bootcamp focusing on rover configurations, visual neural training, and team innovation pitches.",
    urlSlug: "course/future-tech-spring-camp-dubai-2026-ai-robotics-for-kids/",
    tags: ["Camp", "Robotics", "AI", "Spring Break", "Ages 12-15"]
  }
];

// Exporting for use in Node/testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UWR_COURSES;
}
