export interface Skill {
  name: string
  /** Official documentation / tutorial URL. */
  url: string
}

export interface SkillCategory {
  /** i18n key under content.skillCategories */
  key: 'basics' | 'frameworks' | 'state' | 'tooling'
  skills: Skill[]
}

/** Categorised skills with links to their official docs (language-neutral). */
export const skillCategories: SkillCategory[] = [
  {
    key: 'basics',
    skills: [
      { name: 'HTML', url: 'https://developer.mozilla.org/docs/Web/HTML' },
      { name: 'CSS', url: 'https://developer.mozilla.org/docs/Web/CSS' },
      {
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/docs/Web/JavaScript',
      },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/docs/' },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      { name: 'React', url: 'https://react.dev/' },
      { name: 'Vue', url: 'https://vuejs.org/guide/introduction.html' },
      { name: 'Next.js', url: 'https://nextjs.org/docs' },
    ],
  },
  {
    key: 'state',
    skills: [
      { name: 'Zustand', url: 'https://zustand.docs.pmnd.rs/' },
      { name: 'TanStack Query', url: 'https://tanstack.com/query/latest' },
      {
        name: 'Context',
        url: 'https://react.dev/reference/react/useContext',
      },
    ],
  },
  {
    key: 'tooling',
    skills: [
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs' },
      { name: 'Sass', url: 'https://sass-lang.com/documentation/' },
      { name: 'Vite', url: 'https://vite.dev/' },
      { name: 'Git', url: 'https://git-scm.com/doc' },
      { name: 'Jest', url: 'https://jestjs.io/docs/getting-started' },
      { name: 'Figma', url: 'https://help.figma.com/' },
    ],
  },
]
