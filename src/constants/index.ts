import { Angular, Bash, Bootstrap, CSS, Git, Html, Java, JavaScript, Linux, MongoDb, Python, React, TailwindCss, TypeScript } from "./svgs";
import { Github, BlueSky, Twitter, LinkedIn, Discord } from "./svgs";

export const navLinks = [
  {
    name: "Home",
    url: "#home"
  },
  {
    name: "Experience",
    url: "#experience"
  },
  {
    name: "Projects",
    url: "#projects"
  },
  {
    name: "Contact Us",
    url: "#contact"
  }
];

export const tags = [
  "Software Engineer",
  "Frontend Developer",
  "UI Developer",
  "React Developer",
  "Angular Developer",
  "JavaScript Developer",
  "Python Developer",
  "Java Developer",
  "Aspiring Full Stack Developer",
  "MVP Developer",
];

export const skills = [
  MongoDb,
  Bash,
  Linux,
  Bootstrap,
  TailwindCss,
  Git,
  Python,
  React,
  Java,
  Angular,
  JavaScript,
  Html,
  TypeScript,
  CSS
];

export const experiences = [
  {
    position: "Associate Software Engineer",
    company: "Creowis Technologies Pvt. Ltd.",
    duration: {
      from: "JUL 25",
      to: "OCT 25"
    },
    description: [
      "Developed and maintained scalable frontend components using React, Next.js and Tailwind CSS.",
      "Worked with design systems to ensure UI consistency across project.",
      "Followed Agile & Scrum practices, participating in sprint planning and reviews.",
      "Raised multiple production-ready PRs, successfully reviewed and merged.",
      "Used conventional commits and Git workflows for clean version control."
    ]
  }, {
    position: "Intern",
    company: "Creowis Technologies Pvt. Ltd.",
    duration: {
      from: "JUN 25",
      to: "JUL 25"
    },
    description: [
      "Contributed to real-world frontend features using React and Tailwind.",
      "Collaborated with senior developers through code reviews and PR workflows.",
      "Strengthend understanding of component-based architecture."
    ]
  }, {
    position: "UI Developer",
    company: "Outhum Media Pvt. Ltd.",
    duration: {
      from: "JAN 22",
      to: "MAY 23"
    },
    description: [
      "Build responsive Angular applications with improved UX and performance.",
      "Reduced page load time through UI optimization techniques.",
      "Delivered new UI features, increasing user engagement by 25% ̃",
      "Debugged and optimized frontend code, reducing UI bugs by 10%"
    ]
  }, {
    position: "Intern",
    company: "Outhum Media Pvt. Ltd.",
    duration: {
      from: "SEP 21",
      to: "DEC 21"
    },
    description: [
      "Collaborated with team members during brainstorming sessions"
    ]
  }, {
    position: "Python Trainee",
    company: "Solitaire Infosys Inc.",
    duration: {
      from: "JUN 20",
      to: "JUL 20"
    },
    description: [
      "Developed a billing software application using Python and Tkinter",
      "Earned certification for successful program completion",
      "Collaborated with cross - functional teams, improving delivery efficiency."
    ]
  }
];

export const projects = [
  {
    name: "Weather App",
    description: "Weather app is a simple weather app that uses OpenWeatherMap API to get the weather data of a city.",
    tags: [
      "react",
      "weather app",
      "api integration"
    ],
    link: "https://github.com/iamankeshsharma/weather-app"
  },
  {
    name: "PresenterCanvasOverlay",
    description: "Capture screen content or application windows, overlay live camera feed onto canvas, simulating a presenter delivering a presentation.",
    tags: [
      "python",
      "opencv",
      "mediapipe"
    ],
    link: "https://github.com/iamankeshsharma/PresenterCanvasOverlay"
  },
  {
    name: "LittleBrother(GUI)",
    description: "LittleBrother is an information collection tool (OSINT), It is basically a CLI based tool which aims to carry out research on a French, Swiss,Luxembourgish or Belgian person.It provides various modules that allow efficient searches. LittleBrother-GUI- is a extended version of that, It is a GUI based tool.We need some of your information to run this tool properly, We promise you not to leak your data and try to make it more secure.",
    tags: [
      "osint",
      "information gathering tool",
      "cli tool",
      "gui tool"
    ],
    link: "https://github.com/iamankeshsharma/LittleBrother-GUI-"
  },
];

export const socialLinks = [
  {
    name: "BlueSky",
    url: "https://bsky.app/profile/iamankeshsharma.bsky.social",
    icon: BlueSky
  }
  , {
    name: "Github",
    url: "https://github.com/iamankeshsharma",
    icon: Github
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ankesh054/",
    icon: LinkedIn
  },
  {
    name: "Twitter",
    url: "https://x.com/imankeshsharma",
    icon: Twitter
  },
  {
    name: "Discord",
    url: "https://discord.com/users/codewithchai",
    icon: Discord
  }
];