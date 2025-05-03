import { defineConfig } from '@umijs/max';
import CompressionPlugin from 'compression-webpack-plugin';
import routes from './routes';

export default defineConfig({
  routes,
  title: '齐碳科技—新一代基因测序技术开拓者',
  hash: true,
  // dynamicImport: {
  //   loading: '@/components/Loading'
  // },
  initialState: {},
  model: {},
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
    antd: true,
  },
  targets: {
    ie: 11,
  },
  legacy: { nodeModulesTransform: true },
  copy: [
    { from: 'favicon.ico', to: 'dist' },
    { from: 'font.css', to: 'dist' },
  ],
  request: {},
  // history: { type: 'hash' },
  // favicon: ['/favicon.ico'],
  links: [{ rel: 'stylesheet', href: '/font.css', crossOrigin: 'anonymous' }],
  metas: [
    {
      name: 'baidu-site-verification',
      content: 'code-CDbPp8XsYm',
    },
    {
      name: 'msvalidate.01',
      content: 'F0FF6A666BCA0B3461F3B6CF20D0662F',
    },
    {
      'http-equiv': 'content-language',
      content: 'zh-CN',
    },
    // process.env.NODE_ENV !== 'development'
    //   ? {
    //     'http-equiv': 'Content-Security-Policy',
    //     content: 'upgrade-insecure-requests',
    //   }
    //   : {},
  ],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }: { resource: string }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
    if (process.env.NODE_ENV === 'production') {
      //gzip压缩
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          algorithm: 'gzip',
          test: /\.(js|css|html|otf)$/i, // 匹配
          threshold: 10240, // 超过10k的文件压缩
          deleteOriginalAssets: false, // 不删除源文件
        },
      ]);
    }
  },
  // chunks: ['vendors', 'umi'],
  // plugins: ['./src/plugins/map.ts']
  headScripts: [
    {
      src: 'https://api.tianditu.gov.cn/api?v=4.0&tk=807ea72e3b92405c30ad8ae479358923',
      type: 'text/javascript', // 设置脚本类型为 text/javascript
    },
  ],
});
