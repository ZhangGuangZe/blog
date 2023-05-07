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
            // {
            //     text: '前端工程化',
            //     link: '/engineering/'
            // },
            // {
            //     text: '实战项目',
            //     link: '/exercise/'
            // },
            // {
            //     text: '学习总结',
            //     link: '/summarize/front'
            // },
            {
                text: 'GitHub',
                link: 'https://github.com/ZhangGuangZe'
            }
        ],

        // 配置侧边栏
        sidebar: {
            '/front/': [
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
                        ['/front/javascript/type', '类型系统'],
                        ['/front/javascript/object-oriented-programing', '面向对象编程'],
                        ['/front/javascript/functional-programing', '函数式编程'],
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
            '/computer/': [
                {
                    title: '数据结构与算法',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['/computer/algorithms/', '简介'],
                        ['/computer/algorithms/analysis', '算法分析'],
                        ['/computer/algorithms/array', '数组'],
                        ['/computer/algorithms/linked-list', '链表'],
                        ['/computer/algorithms/stack', '栈'],
                        ['/computer/algorithms/queue', '队列'],
                        ['/computer/algorithms/recursion', '递归'],
                        ['/computer/algorithms/sorting', '排序算法'],
                        ['/computer/algorithms/binary-search', '二分查找'],
                        ['/computer/algorithms/hash-table', '散列表'],
                        ['/computer/algorithms/tree', '树'],
                        ['/computer/algorithms/heap', '堆'],
                        ['/computer/algorithms/trie', 'Trie 树'],
                        ['/computer/algorithms/greedy', '贪心算法'],
                        ['/computer/algorithms/design', '算法设计'],
                        // ['/computer/algorithms/graph', '图'],
                        // ['/computer/algorithms/strings', '字符串匹配算法']
                    ]
                },
                {
                    title: '网络协议',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['/computer/protocols/', '简介'],
                        ['/computer/protocols/udp', 'UPD 协议'],
                        ['/computer/protocols/tcp', 'TCP 协议'],
                        ['/computer/protocols/http', 'HTTP 协议'],
                        ['/computer/protocols/https', 'HTTPS 协议'],
                        ['/computer/protocols/dns', 'DNS 协议']
                    ]
                }
            ],
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