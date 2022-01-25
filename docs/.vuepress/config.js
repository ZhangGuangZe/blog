module.exports = {
    base: '/blog/',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],

    // 元信息
    title: '前端男孩',
    description: '让学习前端变得更简单',

    // 配置主题
    themeConfig: {
        // 配置导航栏
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '指南',
                link: '/guide/'
            },
            {
                text: '计算机基础',
                link: '/computer/'
            },
            {
                text: '前端知识体系',
                link: '/front/'
            },
            {
                text: '前端工程化',
                link: '/engineering/'
            },
            {
                text: '实战项目',
                link: '/exercise/'
            },
            {
                text: '学习总结',
                link: '/summarize/front'
            },
            {
                text: 'GitHub',
                link: 'https://github.com/HotZhang'
            }
        ],

        // 配置侧边栏
        sidebar: {
            '/front/': [
                {
                    title: '前端知识体系',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['/front/', '简介']
                    ]
                },
                {
                    title: 'HTML',
                    collapsable: false,
                    sidebarDepth: 2
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    sidebarDepth: 2
                },
                {
                    title: 'JavaScript',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['/front/javascript/history', '发展史'],
                        ['/front/javascript/structure', '语言结构'],
                    ]
                },
                {
                    title: 'WebAPIs',
                    collapsable: false,
                    sidebarDepth: 2
                },
                {
                    title: '浏览器工作原理',
                    collapsable: false,
                    sidebarDepth: 2
                }
            ],
            '/computer/': [{
                title: '计算机基础',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    ['/computer/', '简介'],
                    ['/computer/algorithm', '数据结构与算法'],
                    ['/computer/protocol', '网络协议'],
                    ['/computer/patterns', '设计模式'],
                    ['/computer/network', '计算机网络'],
                    ['/computer/compile', '编译原理'],
                    ['/computer/composition', '计算机组成原理'],
                    ['/computer/os', '操作系统']
                ]
            }],
            '/summarize/': [{
                title: '学习总结',
                collapsable: false,
                children: [
                    ['/summarize/front', '前端训练营总结'],
                    ['/summarize/algorithm', '数据结构与算法总结']
                ]
            }]
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