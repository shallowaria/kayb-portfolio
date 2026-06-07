export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  /** Optional company logo (e.g. "/experience/greenleaf.png"); falls back to an icon. */
  logo?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  cover: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

/** The full translatable content tree. en and zh both implement this shape. */
export interface Content {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  name: string;
  brandTagline: string;
  hero: {
    greeting: string;
    titleLines: string;
    tagline: string;
    viewWork: string;
    contact: string;
  };
  actions: {
    downloadResume: string;
    viewAll: string;
  };
  sections: {
    about: string;
    skills: string;
    education: string;
    experience: string;
    projects: string;
    quote: string;
    contact: string;
  };
  about: {
    bio: string[];
    location: string;
  };
  skillCategories: {
    basics: string;
    frameworks: string;
    state: string;
    tooling: string;
  };
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  quote: {
    text: string;
    author: string;
  };
  footer: {
    rights: string;
  };
  language: {
    label: string;
    zh: string;
    en: string;
  };
  search: {
    label: string;
    placeholder: string;
    sections: string;
    projects: string;
    empty: string;
  };
  contact: {
    qq: string;
    wechat: string;
    email: string;
    phone: string;
    copied: string;
  };
}
