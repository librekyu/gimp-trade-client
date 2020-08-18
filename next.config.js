const webpack = require('webpack');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

require('dotenv').config();

module.exports = withCSS(
  withImages({
    // distDir: '_next',
    optimizeImages: false,

    webpack: config => {
      config.plugins = config.plugins || [];
      config.node = {
        fs: 'empty'
      };

      /** 환경변수 추가 */
      const env = Object.keys(process.env).reduce((accumulator, curr) => {
        accumulator[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return accumulator;
      }, {});
      config.plugins.push(new webpack.DefinePlugin(env));

      /** polyfill 및 prototype 우선 적용. polyfill.js 우선 적용 */
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js']) {
          entries['main.js'].unshift('./src/polyfills.js');
        }
        return entries;
      };

      return config;
    }
  })
);
