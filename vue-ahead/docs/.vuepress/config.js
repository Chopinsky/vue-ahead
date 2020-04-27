module.exports = {
  title: 'Vue-Ahead',
  description: "Documentation site for the Vue-Ahead auto-complete control",
  base: process.env.DEV ? '' : '/vueahead/',
  head: [
    ['link', { rel: "apple-touch-icon", href: "https://cdn.theme.iastate.edu/favicon/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/x-icon", href: "https://cdn.theme.iastate.edu/favicon/favicon.ico"}],
    ['link', { rel: "icon", type: "image/png", href: "https://cdn.theme.iastate.edu/favicon/favicon.png"}],
    // Bootstrap 4:
    ['link', { rel:"stylesheet", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", crossorigin: "anonymous" }],
    // Boostrap 3.3.7 / IASTATE theme:
    // ['link', { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css", crossorigin: "anonymous" }],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
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
