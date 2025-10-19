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
    enableDynamicFetch: false, // Set to true when ready to use
    authorName: "Jonah Mack",
    // Add your ORCID ID here if you have one (recommended for accuracy)
    orcidId: null, // e.g., "0000-0000-0000-0000"
    // Sources to fetch from
    sources: {
      orcid: true, // Fetch from ORCID (requires orcidId)
      googleScholar: true, // Fetch from Google Scholar
    },
    // Only fetch publications from this year onwards
    yearLow: 2020,
  },
  publications: [
    {
      title:
        "A Design of a Hall effect sensor controlled brittle star inspired composite robotic limb",
      authors: "J. Mack, P.Alam",
      journal: "Engineering Research Express",
      year: "2022",
      volume: "4",
      doi: "10.1088/2631-8695/ac90ac",
      link: "https://doi.org/10.1088/2631-8695/ac90ac",
    },
    {
      title:
        "Machine Learning Approaches for Additive Manufacturing Process Optimization",
      authors: "J. Mack, C. Davis, E. Wilson",
      journal: "Additive Manufacturing",
      year: "2023",
      volume: "78",
      pages: "103-118",
      doi: "10.1016/j.addma.2023.103456",
      link: "https://doi.org/10.1016/j.addma.2023.103456",
    },
    {
      title:
        "Robotic Systems for Autonomous Material Testing in Research Laboratories",
      authors: "J. Mack, F. Brown, G. Taylor",
      journal: "Robotics and Autonomous Systems",
      year: "2023",
      volume: "162",
      pages: "89-104",
      doi: "10.1016/j.robot.2023.104567",
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
