import { defineConfig } from 'umi';
import path from 'path';
import fs from 'fs';
const IS_PROD = process.env.NODE_ENV !== 'development'; // 是否为生产环境

import { resolve } from 'path';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: {},
  locale: {},
  // 路由模式
  history: {
    type: 'hash',
  },
  publicPath: './',
  outputPath: 'app/build',
  fastRefresh: {},
  //   antd: {}, // 启用UMI自带的antd
  theme: {
    'font-size-base': '12px',
    '@primary-color': '#bb3b24',
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
  },
  extraBabelPlugins: [
    // IS_PROD ? 'transform-remove-console' : '', // 生产关闭打印
  ],
});
