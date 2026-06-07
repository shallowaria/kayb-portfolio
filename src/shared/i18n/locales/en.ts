import type { Content } from "@/shared/i18n/types";

// The 4-letter word for "source text" gets rewritten to a path on write in
// this environment, so we assemble it from fragments.
const CO_DE = "co" + "de";

export const en: Content = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    experience: "EXPERIENCE",
    projects: "PROJECTS",
    contact: "CONTACT",
  },
  name: "Kayb",
  brandTagline: "Resume Page",
  documentTitle: "Kayb · Front-end Portfolio",
  hero: {
    greeting: "Hi, I'm Kayb.",
    titleLines: "A Front-end Developer",
    tagline: `I build scalable web experiences with clean ${CO_DE}, beautiful UI, and meaningful stories.`,
    viewWork: "VIEW MY WORK",
    contact: "CONTACT ME",
  },
  actions: {
    downloadResume: "DOWNLOAD RESUME",
    viewAll: "VIEW ALL",
  },
  sections: {
    about: "ABOUT ME",
    skills: "SKILLS",
    education: "EDUCATION",
    experience: "EXPERIENCE",
    projects: "FEATURED PROJECTS",
    quote: "QUOTE",
    contact: "GET IN TOUCH",
  },
  about: {
    bio: [
      `A front-end developer who loves clean ${CO_DE}, beautiful UI, and meaningful animes.`,
      "I enjoy turning ideas into delightful web experiences.",
    ],
    location: "Earth",
  },
  skillCategories: {
    basics: "Basics",
    frameworks: "Frameworks",
    state: "State Management",
    tooling: "Tooling",
  },
  experiences: [
    {
      role: "Senior Front-end Developer",
      company: "Greenleaf Studio",
      period: "2022 – Present",
      summary:
        "Lead the development of scalable web applications. Focus on performance, accessibility, and delightful UI.",
      logo: "/experience/greenleaf.png",
    },
    {
      role: "Front-end Developer",
      company: "Stonepeak Labs",
      period: "2019 – 2022",
      summary:
        "Built responsive interfaces and design systems. Collaborated with designers and back-end engineers.",
      logo: "/experience/stonepeak.png",
    },
  ],
  projects: [
    {
      title: "Scavenger Blog",
      description:
        "A front-end blog built for storytellers and dreamers. Built with Next.js, Tailwind CSS, and MDX.",
      link: "https://scavenger-blog.vercel.app",
      linkLabel: "scavenger-blog.vercel.app",
      cover: "/projects/project-1.jpg",
    },
    {
      title: "Wilderness UI Kit",
      description:
        "A nature-inspired UI kit for web and mobile apps. Designed with Figma and built with React.",
      link: "https://wilderness-ui-kit.vercel.app",
      linkLabel: "wilderness-ui-kit.vercel.app",
      cover: "/projects/project-2.jpg",
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "Greenfield University",
      period: "2015 – 2019",
    },
  ],
  quote: {
    text: "i pensieri stretti & il viso sciolto",
    author: "Paul Graham",
  },
  footer: {
    rights: "All rights reserved.",
  },
  language: {
    label: "Language",
    zh: "中文",
    en: "English",
  },
  search: {
    label: "Search",
    placeholder: "Search sections, projects…",
    sections: "Sections",
    projects: "Projects",
    empty: "No results found.",
  },
  contact: {
    qq: "QQ",
    wechat: "WeChat",
    email: "Email",
    phone: "Phone",
    copied: "Copied!",
  },
};
