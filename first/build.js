'use strict';

const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');

const build = path.resolve(process.env.BUILD_DEST || 'build');

// 获取 package.json 中的主题配置文件
let theme = '@alife/theme-*';
try {
  const pkg = require('./package.json');
  if (pkg && pkg.buildConfig && pkg.buildConfig.theme) {
    theme = pkg.buildConfig.theme;
  } else {
    const fieConfig = require('./fie.config.js');
    if (fieConfig && fieConfig.toolkitConfig && fieConfig.toolkitConfig.theme) {
      theme = fieConfig.toolkitConfig.theme;
      console.warn(`fie中的主题包配置已迁移, 请在 package.json 中配置
      buildConfig:{
        theme: '@alife/theme-主题包名'
      }`);
    }
  }
} catch (e) {
  console.error(e);
  console.log(`请在 package.json 中配置
  buildConfig:{
    theme: '@alife/theme-主题包名'
  }`);
}

// STEP 1 获取自定义主题的文件
const paths = globby.sync([
  `node_modules/${theme}/dist/*`,
]);

// STEP 2 将主题文件覆盖到next中
paths.forEach((item) => {
  const filename = path.basename(item);
  fs.copySync(item, `node_modules/@alifd/next/dist/${filename}`);
});


// STEP 3 将lib copy 到 build 目录
globby([
  'node_modules/babel-polyfill/dist/*',
  'node_modules/react/umd/*',
  'node_modules/react-dom/umd/*',
  'node_modules/react-redux/dist/*',
  'node_modules/react-router/umd/*',
  'node_modules/react-router-redux/dist/*',
  'node_modules/redux-thunk/dist/*',
  'node_modules/redux/dist/*',
  'node_modules/@alifd/next/dist/*',
]).then((paths2) => {
  fs.mkdirsSync('build/lib/');
  paths2.forEach((item) => {
    const filename = path.basename(item);
    fs.copySync(item, `${build}/lib/${filename}`);
  });
});

console.log('copy files to build/lib done !');
