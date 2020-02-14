module.exports = {
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 元信息
  title: '前端男孩',
  description: '让前端变得更简单',

  // 配置主题
  themeConfig: {
    // 配置导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/front/' },
      { text: '后端', link: '/back/' },
      { text: '阅读', link: '/read/' },
      { 
        text: '语言', 
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'English', link: '/language/english' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/HotZhang' }
    ],

    // 配置侧边栏
    sidebar: {
      '/front/': [
        {
          title: '前端',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            [ '/front/html', 'HTML' ],
            [ '/front/css', 'CSS' ],
            [ '/front/javascript', 'JavaScript' ],
            [ '/front/vue', 'Vue' ],
          ]
        }
      ]
    },

    // 搜索引擎
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    },

    // 最后更新时间
    lastUpdated: 'Last Updated',

    // 启动页面滚动效果
    smoothScroll: true,

  }
}
  