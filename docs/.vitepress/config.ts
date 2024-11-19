import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: '@zl-asica/react',
  description:
    'A collection of reusable React hooks and utilities provided by ZL Asica.',
  head: [
    [
      'meta',
      {
        name: 'keywords',
        content: 'react, hooks, utilities, zl-asica',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: 'ZL Asica',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
        rel: 'stylesheet',
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/zl-asica/react' },
    ],
    sidebar: {
      '/api/': [
        {
          text: 'API Documentation',
          collapsed: false,
          items: [
            { text: 'Async Hooks', link: '/api/hooks/async/' },
            { text: 'DOM Hooks', link: '/api/hooks/dom/' },
            { text: 'State Hooks', link: '/api/hooks/state/' },
            { text: 'Utilities', link: '/api/utils' },
          ],
        },
      ],
      '/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Guide', link: '/guide' },
          ],
        },
      ],
    },
    // socialLinks: [{ icon: 'github', link: 'https://github.com/zl-asica' }],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright ©️ 2024-Present ZL Asica',
    },
  },
  ignoreDeadLinks: true,
});
