export const siteConfig = {
  name: "Jonah Mack",
  firstName: "Jonah",
  title: "Mechanical Engineer — Lab Automation & Self-Driving Labs",
  tagline: "I design, build, and bring things to life.",
  description:
    "Portfolio of Jonah Mack — mechanical engineer building self-driving lab hardware, valves, and instrumentation.",
  accentColor: "#b026ff",
  social: {
    email: "s1862353@ed.ac.uk",
    linkedin: "https://linkedin.com/in/jonah-mack",
    github: "https://github.com/Jmack66",
  },
  aboutMe:
    "PhD researcher in Robotics and Autonomous Systems at the University of Edinburgh, building hardware for self-driving labs—valves, liquid handling, and instrumentation—with experience in CAD, machining, welding, and Design for Manufacture.",
  skills: [
    "CAD",
    "5-Axis CNC Machining",
    "Welding",
    "C++",
    "Control Systems",
    "Lab Automation / SDL",
    "Manufacturing",
    "Rapid Prototyping",
    "Videography & Editing",
  ],
  // Publication fetching configuration
  publicationConfig: {
    // Set to true to fetch publications dynamically at build time
    enableDynamicFetch: false, // Disabled - using local script to update static publications
    authorName: "Jonah Mack",
    // Add your ORCID ID here if you have one (recommended for accuracy)
    orcidId: null, // e.g., "0000-0000-0000-0000"
    // Sources to fetch from
    sources: {
      orcid: false, // Fetch from ORCID (requires orcidId)
      googleScholar: true, // Fetch from Google Scholar
    },
    // Only fetch publications from this year onwards
    yearLow: 2020,
  },
  publications: [
    {
      title: "A Nonvolatile Switchable-polarity EPM Valve",
      authors: "B Wang, J Mack, F Giorgio-Serchi, AA Stokes",
      journal: "arXiv (preprint)",
      year: "2026",
      link: "https://arxiv.org/abs/2603.24811",
    },
    {
      title: "An Optimised Spider-Inspired Soft Actuator for Extraterrestrial Exploration",
      authors: "J Mack, M Gepner, F Giorgio-Serchi, AA Stokes",
      journal: "MDPI Journal",
      year: "2025",
      link: "https://www.mdpi.com/2313-7673/10/7/455",
    },
    {
      title: "A standardized platform for translational advances in fluidic soft systems",
      authors: "M Gepner, J Mack, AA Stokes",
      journal: "CELL",
      year: "2024",
      link: "https://www.cell.com/device/fulltext/S2666-9986(25)00113-9",
    },
    {
      title: "Fluidic FlowBots: Intelligence embodied in the characteristics of recirculating fluid flow",
      authors: "M Gepner, J Mack, F Giorgio-Serchi",
      journal: "IEEE Publication",
      year: "2024",
      link: "https://ieeexplore.ieee.org/abstract/document/10522011/",
    },
    {
      title: "From e-waste to robots: a case study on e-waste upcycling in low-to-middle income countries",
      authors: "J Mack, P Alam",
      journal: "RESEARCH.ED.AC.UK",
      year: "2024",
      link: "https://ieeexplore.ieee.org/abstract/document/9698905/",
    },
    {
      title: "Towards a Bio-Inspired Integrated Total Habitability Instrument",
      authors: "J Mack, I Underwood",
      journal: "PREPRINTS",
      year: "2024",
      doi: "10.0263/download/final_file",
      link: "https://www.preprints.org/manuscript/202510.0263/download/final_file",
    },
    {
      title: "Sundoli: A necro (w) bot with multi-stiffness joints built using geared mechanical metastructures",
      authors: "H Lee, J Mack, P Alam",
      journal: "BIORXIV",
      year: "2024",
      doi: "10.1101/2025.05.16.654441",
      link: "https://www.biorxiv.org/content/10.1101/2025.05.16.654441",
    },
    {
      title: "Design of a Hall effect sensor controlled brittle star inspired composite robotic limb",
      authors: "J Mack, P Alam",
      journal: "IOPSCIENCE.IOP",
      year: "2022",
      doi: "10.1088/2631-8695/ac90ac/meta",
      link: "https://iopscience.iop.org/article/10.1088/2631-8695/ac90ac/meta",
    },
    {
      title: "Corrigendum: Design of a Hall effect sensor controlled brittle star inspired composite robotic limb (2022 Eng. Res. Express 4 036001)",
      authors: "J Mack, P Alam",
      journal: "Unknown Venue",
      year: "2022",
      link: "https://www.research.ed.ac.uk/en/publications/corrigendum-design-of-a-hall-effect-sensor-controlled-brittle-sta",
    },
  ],
  projects: [
    {
      name: "S-EPM Valve",
      description:
        "Switchable-Polarity ElectroPermanent Magnet valve for liquid routing. Bistable, zero continuous power, pulsed switching (~0.6 J/switch), rated to 500 kPa static / 320 kPa dynamic. Built to replace solenoid valves whose Joule heating destroys biochemical assays.",
      link: "https://arxiv.org/abs/2603.24811",
      skills: ["CAD", "Electromagnetics", "Fluidics", "Testing & Validation"],
      media: [
        { type: "video", src: "/media/sepm-valve-6port-demo.mp4", caption: "A 6-port S-EPM valve manifold routing dyed liquid on demand" },
        { type: "video", src: "/media/sepm-valve-mechanism.mp4", caption: "Pinch-valve mechanism: the silicone tube is clamped closed between the magnet poles" },
      ],
    },
    {
      name: "Fluidic Soft-Systems Platform",
      description:
        "A standardized platform for translating fluidic soft robots out of the lab: recirculating-flow actuation embodying control intelligence in the fluid itself, rather than in discrete electronics per joint.",
      link: "https://www.cell.com/device/fulltext/S2666-9986(25)00113-9",
      skills: ["Soft Robotics", "Fluidics", "CAD", "Testing & Validation"],
      media: [
        { type: "video", src: "/media/flexbot-fluidic-platform.mp4", caption: "Fluidically-actuated soft robot under pneumatic power, 7x speed" },
      ],
    },
    {
      name: "Orion Aerospace",
      description:
        "Co-founded and built one of few documented self-landing, thrust-vector-controlled model rockets at this scale. 7+ years of build-test-fly-fail-rebuild cycles, embedded control, and educational content reaching 100k+ views.",
      link: "https://youtube.com/orionaerospace",
      skills: ["Embedded Control", "C++", "Manufacturing", "Test & Bring-up"],
      media: [
        { type: "youtube", id: "GJxBAZ-TtMo", caption: "Vertically landing a model rocket under thrust-vector control" },
        { type: "video", src: "/media/orion-insight-launch.mp4", caption: "Insight C-1 launch, raw flight footage" },
      ],
    },
    {
      name: "Fabrication in the Loop for Self-Driving Labs",
      description:
        "PhD thesis: using tool-changing and in-line additive manufacturing to build a compact, reconfigurable self-driving-lab system — fabrication as a first-class step in the experiment loop, not a separate process.",
      comingSoon: true,
      skills: ["Additive Manufacturing", "SDL Hardware", "Python", "CodeCAD"],
    },
  ],
  sideProjects: [
    {
      name: "Magnum Smart Sampler",
      description:
        "Sanitary liquid-sampling device built for Magnum/Hemisphere Brands during COVID-19, concept to working prototype in 3 months: multi-hundred-part CAD assembly, PCB, firmware, and 3D-printed manufacturing for a pilot model shown to investors.",
      link: "https://www.youtube.com/watch?v=lWS1v18j9_U",
      skills: ["CAD", "PCB Design", "Firmware"],
      media: [
        { type: "youtube", id: "lWS1v18j9_U", caption: "Smart Sampler demo" },
      ],
    },
    {
      name: "Sidekick",
      description:
        "Open-source hardware/software ecosystem — a custom control board plus a GUI and C++ macro library — built to make robotics prototyping faster than breadboarding and rewriting the same Arduino code every time.",
      link: "https://github.com/OrionAerospaceYT/SideKick",
      skills: ["PCB Design", "C++", "Firmware", "Tooling/GUI"],
      media: [
        { type: "image", src: "/media/side/sidekick-board.jpg", caption: "The custom Sidekick control board" },
        { type: "image", src: "/media/side/sidekick-test-rig.jpg", caption: "Bench-testing a stepper rig live against the Sidekick GUI" },
        { type: "image", src: "/media/side/sidekick-pcb-macro.jpg", caption: "Macro shot of the board" },
      ],
    },
    {
      name: "Hoverboard Hack",
      description:
        "Reverse-engineered a stock hoverboard's motor controller and Hall-sensor wiring to drive it as a general-purpose motor, becoming the base control layer for a powered furniture mover — hacked start to finish in 48 hours because a friend had to move the next day.",
      link: "https://github.com/Jmack66/Hoverboard_Hack/tree/main",
      skills: ["Reverse Engineering", "Firmware", "Motor Control"],
      media: [
        { type: "video", src: "/media/side/hoverboard-hack.mp4", caption: "Hacked hoverboard motor running the furniture mover" },
      ],
    },
    {
      name: "Drawing Robot",
      description:
        "A dead Makerbot's XY motion frame given a second life as a 2D plotter for outreach — shown at an art exhibition, then teaching visitors how it works at a Dynamic Earth open day.",
      link: "https://lnkd.in/p/ebJ5QyFS",
      skills: ["Outreach", "CodeCAD", "Motion Control"],
      media: [
        { type: "image", src: "/media/side/drawing-robot-dynamic-earth-1.jpg", caption: "The plotter on display at Dynamic Earth" },
        { type: "image", src: "/media/side/drawing-robot-dynamic-earth-2.jpg", caption: "Mid-draw, talking visitors through how it works" },
      ],
    },
  ],
  experience: [
    {
      company: "Lypo Ltd",
      title: "Automation Engineer",
      dateRange: "Sept 2026 - Present",
      bullets: [
        "Build low-cost self-driving-lab hardware for a protein-discovery SDL, from concept through bring-up",
        "Built an autonomous liquid-handling platform from a modified FDM 3D printer with tool-changing and an imaging pipeline, closed-loop under agent-directed control",
        "Translate scientists' workflow requirements directly into build-ready hardware",
      ],
    },
    {
      company: "University of Edinburgh, Soft Systems Group",
      title: "PhD Researcher, Robotics and Autonomous Systems",
      dateRange: "2022 - Present",
      bullets: [
        "Co-developed the S-EPM valve and designed the Infinite Fluidic Machines print bed (see Projects)",
        "Built custom test rigs and instrumentation for nearly every publication in the group, plus hardware for external biology/oncology collaborators",
        "Self-taught 5-axis CNC machining and welding; now teaches Design-for-Manufacture and machining courses at the university",
      ],
    },
    {
      company: "Aeroflow",
      title: "Innovative Design Lead",
      dateRange: "Aug 2025 - Present",
      bullets: [
        "On-call design consultant for a 40 ft aerodynamic trailer program",
        "Provide onsite manufacturing and welding support during fabrication",
        "Balance aerodynamic targets against manufacturability and fabrication tolerances",
      ],
    },
    {
      company: "Konpanion",
      title: "Engineering Consultant",
      dateRange: "Apr 2024",
      bullets: [
        "Designed and built the power-delivery PCB for 'Maah', Konpanion's commercially-sold companion robot",
      ],
    },
    {
      company: "BBC",
      title: "Engineering Intern/Consultant",
      dateRange: "Jan 2022 - May 2022",
      bullets: [
        "Paid contract to design and manufacture a custom filming enclosure for a future BBC production",
        "Reverse-engineered complex geometry from previous work and manufactured a working prototype, shipped to the filming site",
      ],
    },
    {
      company: "Roslin Institute",
      title: "Engineering Intern",
      dateRange: "Mar 2022 - Apr 2022",
      bullets: [
        "Designed and manufactured an electronically-controlled chicken-neck-mimicking device",
        "Built test equipment used by a PhD researcher to measure force and motion path in chicken pecking-injury research",
      ],
    },
    {
      company: "University of Edinburgh (Dr. Parvez Alam)",
      title: "Engineering Research Intern",
      dateRange: "Summer 2021",
      bullets: [
        "Investigated the feasibility of using electronic waste in low-to-middle income countries to generate useful robotics components",
        "Work accepted and published at the 2021 IEEE International Humanitarian Technology Conference (IHTC); presented in a 15-minute talk plus Q&A",
      ],
    },
    {
      company: "Magnum / Hemisphere Brands Ltd",
      title: "Engineering Consultant — Sanitary Sampling Prototype",
      dateRange: "Summer 2020",
      bullets: [
        "Led the engineering behind a sanitary liquid-sampling device during COVID-19, from concept to a working prototype in 3 months",
        "Owned a multi-hundred-part CAD assembly, PCB design, firmware, and 3D-printed manufacturing to produce a pilot model for investors",
      ],
    },
    {
      company: "Endeavour Rockets",
      title: "Technical Lead",
      dateRange: "Oct 2019 - Present",
      bullets: [
        "One of 3 founding members of the University of Edinburgh's student rocketry team",
        "Co-leading development of a 50 N liquid-bipropellant engine and a hopper/lander platform for advanced control-systems testing",
      ],
    },
  ],
  education: [
    {
      school: "University of Edinburgh",
      degree: "Bachelor of Engineering with Honors",
      dateRange: "2018 - 2022",
      achievements: [
        "Honors thesis awarded best project by the Institution of Mechanical Engineers",
        "Graduated with a 2.1",
      ],
    },
    {
      school: "University of Edinburgh",
      degree: "PhD in Robotics and Autonomous Systems",
      dateRange: "2022 - present",
      achievements: ["Outreach and communication award"],
    },
  ],
};
