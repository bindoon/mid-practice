const path = require('path');

module.exports = (env, argv) => {

  const config = {
    entry: {
      'pages/help/index':  './src/pages/help/index.jsx',
      'pages/index/index':  './src/pages/index/index.jsx',
      'pages/simple/index':  './src/pages/simple/index.jsx',
    },
    output: {
      path: path.resolve('build'),
      publicPath: 'build',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'moment': 'moment',
      '@alifd/next': 'Next'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      // alias: {
      //   components: path.join(__dirname, 'src/components'),
      //   utils: path.join(__dirname, 'src/utils'),
      // },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            // 主题
            {
              loader: '@alifd/next-theme-loader',
              options: {
                theme: '@alifd/theme-2',
              },
            }
          ],
        },
      ],
    }
  }

  if (argv.mode === 'development') {
    config.devtool = 'source-map';

    // 开发环境本地 web 服务
    config.devServer = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      stats: {
        chunks: false,
        children: false,
        modules: false,
        chunkModules: false,
      },
    };
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
