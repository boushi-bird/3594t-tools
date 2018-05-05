const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../../docs/'),
    filename: 'embed.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: (process.env.PORT || 8443),
    https: true,
    contentBase: path.resolve(__dirname, '../../docs/')
  }
}
