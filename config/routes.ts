export default [
  { path: '/sequencers-3841', component: '@/pages/sequencers3841', exact: true },
  { path: '/sequencers-6k', component: '@/pages/sequencers6k', exact: true },
  { path: '/sequencers-6khex', component: '@/pages/sequencers6khex', exact: true },
  { path: '/sequencers-automation', component: '@/pages/sequencersAutomation', exact: true },
  {
    path: '/',
    component: '@/layout/index',
    routes: [
      { path: '/', component: '@/pages/index', exact: true, keywords: '首页' },
      { path: '/mobile', component: '@/pages/mobileIndex', exact: true },
      {
        name: 'products',
        path: '/products',
        component: '@/pages/products',
        routes: [
          {
            name: 'nanoporeGene',
            path: '/products/nanoporeGene',
            component: '@/pages/products/nanoporeGene',
            exact: true,
          },
          {
            path: '/products/sequencer',
            component: '@/pages/products/sequencer',
            exact: true,
          },
          {
            path: '/products/supplies',
            component: '@/pages/products/supplies',
            exact: true,
          },
          {
            path: '/products/software',
            component: '@/pages/products/software',
            exact: true,
          },
          {
            path: '/products/tools',
            component: '@/pages/products/tools',
            exact: true,
          },
        ],
      },
      {
        path: '/applications',
        component: '@/pages/applications',
        routes: [
          {
            path: '/applications/microorganism',
            component: '@/pages/applications/microorganism',
            exact: true,
          },
          {
            path: '/applications/human',
            component: '@/pages/applications/human',
            exact: true,
          },
          {
            path: '/applications/animal',
            component: '@/pages/applications/animal',
            exact: true,
          },
          {
            path: '/applications/plant',
            component: '@/pages/applications/plant',
            exact: true,
          },
          {
            path: '/applications/clinical',
            component: '@/pages/applications/clinical',
            exact: true,
          },
        ],
      },
      {
        path: '/support',
        component: '@/pages/support',
        routes: [
          {
            path: '/support/customer',
            component: '@/pages/support/customer',
            exact: true,
          },
          {
            path: '/support/document',
            component: '@/pages/support/document',
            exact: true,
            blocks: ['article'],
          },
          {
            path: '/support/documentArticle',
            component: '@/pages/support/document',
            exact: true,
            blocks: ['article'],
          },
          {
            path: '/support/video',
            component: '@/pages/support/video',
            exact: true,
          },
          {
            path: '/support/conversionTool',
            component: '@/pages/support/conversionTool',
            exact: true,
          },
        ],
      },
      {
        path: '/news/:type',
        component: '@/pages/news',
        exact: true,
      },
      {
        path: '/about',
        component: '@/pages/about',
        routes: [
          {
            path: '/about/aboutUs',
            component: '@/pages/about/aboutUs',
            exact: true,
          },
          {
            path: '/about/joinUs',
            component: '@/pages/about/joinUs',
            exact: true,
          },
        ],
      },
      {
        path: '/contact',
        component: '@/pages/contact',
        exact: true,
      },
      {
        path: '/*',
        component: '@/pages/404/index',
        exact: false,
      },
      {
        path: '/404',
        component: '@/pages/404/index',
        exact: true,
      },
    ],
  },
];
