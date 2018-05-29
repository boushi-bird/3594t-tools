import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  entry: {
    hub: path.resolve(__dirname, 'src/hub/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'scripts/[hash].[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(['docs/scripts']),
    new HtmlWebpackPlugin({
      title: 'Hub page',
      filename: 'hub/index.html',
      chunks: ['hub'],
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
}
