module.exports = {
  base: '/blog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 元信息
  title: '前端男孩',
  description: '让学习前端变得更简单',

  // 配置主题
  themeConfig: {
    // 配置导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '计算机基础', link: '/computer/' },
      { text: '前端基础', link: '/front/' },
      { text: '学习总结', link: '/summarize/front' },
      { text: 'GitHub', link: 'https://github.com/HotZhang' }
    ],

    // 配置侧边栏
    sidebar: {
      '/front/': [
        {
          title: '前端体系',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            [ '/front/', '简介' ],
            [ '/front/html', 'HTML' ],
            [ '/front/css', 'CSS' ],
            [ '/front/javascript', 'JavaScript' ]
          ]
        }
      ],
      '/summarize/': [
        {
          title: '学习总结',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            [ '/summarize/front', '前端训练营总结' ],
            [ '/summarize/algorithm', '数据结构与算法总结' ]
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
    lastUpdated: '更新时间',

    // 启动页面滚动效果
    smoothScroll: true,

  }
}
  