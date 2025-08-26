import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Meta Env Typed',
  tagline: 'Type-safe environment variables for TypeScript projects',
  favicon: 'img/favicon.ico',

  url: 'https://jsonlee12138.github.io',
  baseUrl: '/meta-env-typed/',

  organizationName: 'JsonLee12138',
  projectName: 'meta-env-typed',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        path: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/JsonLee12138/meta-env-typed/tree/main/apps/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Meta Env Typed',
      logo: {
        alt: 'Meta Env Typed Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          position: 'right',
          label: 'Changelogs',
          to: '/docs/changelogs',
        },
        {
          href: 'https://www.npmjs.com/package/meta-env-typed',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/JsonLee12138/meta-env-typed',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/configuration/options',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/JsonLee12138/meta-env-typed/issues',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/666U6JTCQY',
            },
            {
              label: 'QQ社区',
              href: 'https://pd.qq.com/s/fjwy3eo20?b=9',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/JsonLee12138/meta-env-typed',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/meta-env-typed',
            },
          ],
        },
      ],
      copyright: `Copyright © 2025 JsonLee12138. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
