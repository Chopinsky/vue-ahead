module.exports = {
  title: 'Vue-Ahead',
  description: "Documentation site for the Vue-Ahead auto-complete control",
  themeConfig: {
    nav: [
      { text: 'SETUP', link: '/guide/setup' },
      { text: 'API GUIDE', link: '/guide/api' },
    ],
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/setup',
          '/guide/api',
        ],
      },
    ],
  }
}