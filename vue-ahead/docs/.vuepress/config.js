module.exports = {
  title: 'Vue-Ahead',
  description: "Documentation site for the Vue-Ahead auto-complete control",
  themeConfig: {
    nav: [
      { text: 'SETUP', link: '/guide/setup' },
      { text: 'API', link: '/guide/api' },
      { text: 'EXAMPLES', link: '/guide/examples' },
    ],
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/setup',
          '/guide/api',
          '/guide/examples',
        ],
      },
    ],
  }
}