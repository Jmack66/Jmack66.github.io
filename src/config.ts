export const siteConfig = {
  name: "Jonah Mack",
  title: "Additive Manufacturing and Lab Automation PhD Student",
  description: "My website",
  accentColor: "#7900ffff",
  social: {
    email: "s1862353@ed.ac.uk",
    linkedin: "https://linkedin.com/in/jonah-mack",
    github: "https://github.com/Jmack66",
  },
  aboutMe:
    "PhD Student in Robotics and Autonomous systems at the University of Edinburgh, focusing on laboratory automation and additive manufacturing. I like to build things.",
  skills: [
    "CAD",
    "C++",
    "Control Systems",
    "Manufacturing",
    "Rapid Prototyping",
    "Systems Engineering",
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
      title: "An Optimised Spider-Inspired Soft Actuator for Extraterrestrial Exploration",
      authors: "J Mack, M Gepner, F Giorgio-Serchi, AA Stokes",
      journal: "MDPI Journal",
      year: "2024",
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
      name: "AI Dev Roundup Newsletter",
      description:
        "One concise email. Five minutes. Every Tuesday. Essential AI news & trends, production-ready libraries, powerful AI tools, and real-world code examples",
      link: "https://aidevroundup.com/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      name: "Chrome Extension Mastery: Build Full-Stack Extensions with React & Node.js",
      description:
        "Master the art of building production-ready, full-stack Chrome Extensions using modern web technologies and best practices",
      link: "https://fullstackextensions.com/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      name: "ExtensionKit",
      description:
        "Kit to jump-start your Chrome extension projects with a variety of battle-tested starter templates & examples",
      link: "https://extensionkit.io/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
  ],
  experience: [
    {
      company: "Tech Company",
      title: "Senior Software Engineer",
      dateRange: "Jan 2022 - Present",
      bullets: [
        "Led development of microservices architecture serving 1M+ users",
        "Reduced API response times by 40% through optimization",
        "Mentored team of 5 junior developers",
      ],
    },
    {
      company: "Startup Inc",
      title: "Full Stack Developer",
      dateRange: "Jun 2020 - Dec 2021",
      bullets: [
        "Built and launched MVP product from scratch using React and Node.js",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Collaborated with product team to define technical requirements",
      ],
    },
    {
      company: "Digital Agency",
      title: "Frontend Developer",
      dateRange: "Aug 2018 - May 2020",
      bullets: [
        "Developed responsive web applications for 20+ clients",
        "Improved site performance scores by 35% on average",
        "Introduced modern JavaScript frameworks to legacy codebases",
      ],
    },
  ],
  education: [
    {
      school: "University of Edinburgh",
      degree: "Bachelor of Engineering with Honors",
      dateRange: "2018 - 2022",
      achievements: [
        "Honors thesis awarded best project by the Institute of Mechanical Engineers",
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
