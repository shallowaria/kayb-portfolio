import type { Content } from "@/shared/i18n/types";

export const zh: Content = {
  nav: {
    home: "首页",
    about: "关于",
    experience: "经历",
    projects: "项目",
    contact: "联系",
  },
  name: "凯布",
  brandTagline: "求职页",
  documentTitle: "凯布 · 前端求职页",
  hero: {
    greeting: "你好，我是凯布。",
    titleLines: "是一名前端开发者",
    tagline:
      "我用整洁的代码、精致的界面与有温度的故事，构建可扩展的 Web 体验。",
    viewWork: "查看作品",
    contact: "联系我",
  },
  actions: {
    downloadResume: "下载简历",
    viewAll: "查看全部",
  },
  sections: {
    about: "关于我",
    skills: "技能",
    education: "教育经历",
    experience: "工作经历",
    projects: "精选项目",
    quote: "箴言",
    contact: "联系方式",
  },
  about: {
    bio: [
      "一名热爱整洁代码、精致 UI 与有意义动画的前端开发者。",
      "我喜欢把想法打磨成令人愉悦的 Web 体验。",
    ],
    location: "地球",
  },
  skillCategories: {
    basics: "基础",
    frameworks: "框架",
    state: "状态管理",
    tooling: "工具",
  },
  experiences: [
    {
      role: "高级前端开发工程师",
      company: "Greenleaf Studio",
      period: "2022 – 至今",
      summary:
        "主导可扩展 Web 应用的开发，专注于性能、无障碍与令人愉悦的界面体验。",
      logo: "/experience/greenleaf.png",
    },
    {
      role: "前端开发工程师",
      company: "Stonepeak Labs",
      period: "2019 – 2022",
      summary: "构建响应式界面与设计系统，与设计师及后端工程师紧密协作。",
      logo: "/experience/stonepeak.png",
    },
  ],
  projects: [
    {
      title: "Scavenger 博客",
      description:
        "一个为讲述者与梦想家打造的前端博客，使用 Next.js、Tailwind CSS 与 MDX 构建。",
      link: "https://scavenger-blog.vercel.app",
      linkLabel: "scavenger-blog.vercel.app",
      cover: "/projects/project-1.jpg",
    },
    {
      title: "Wilderness UI Kit",
      description:
        "一套受自然启发的 Web 与移动端 UI 套件，使用 Figma 设计、React 实现。",
      link: "https://wilderness-ui-kit.vercel.app",
      linkLabel: "wilderness-ui-kit.vercel.app",
      cover: "/projects/project-2.jpg",
    },
  ],
  education: [
    {
      degree: "计算机科学学士",
      school: "Greenfield University",
      period: "2015 – 2019",
    },
  ],
  quote: {
    text: "i pensieri stretti & il viso sciolto",
    author: "保罗·格雷厄姆",
  },
  footer: {
    rights: "保留所有权利。",
  },
  language: {
    label: "语言",
    zh: "中文",
    en: "English",
  },
  search: {
    label: "搜索",
    placeholder: "搜索板块、项目…",
    sections: "板块",
    projects: "项目",
    empty: "没有找到结果。",
  },
  contact: {
    qq: "QQ",
    wechat: "微信",
    email: "邮箱",
    phone: "电话",
    copied: "已复制！",
  },
};
