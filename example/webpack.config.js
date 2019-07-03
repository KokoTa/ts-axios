const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  // 入口文件格式：
  // {
  //   simple:
  //     [
  //       'webpack-hot-middleware/client',
  //       'f:\\Github\\Program\\ts-axios\\example\\simple\\app.ts'
  //     ]
  // }
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const entry = path.join(__dirname, dir, 'app.ts')
    if (fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry] // 热更新引入
    }
    return entries
  }, {}),

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js', // 这个 name 对应入口文件 key
    publicPath: '/build'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader' // 用于检验 ts 文件
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader', // 用于转义 ts 文件
            options: {
              transpileOnly: true // 关闭类型检查，加快编译速度
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    // 热更新需要引入以下两个模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
