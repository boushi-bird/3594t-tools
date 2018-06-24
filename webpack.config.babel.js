import path from 'path'
import Dotenv from 'dotenv-webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/lib/plugin'

const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

export default {
  mode,
  entry: {
    hub: path.resolve(__dirname, 'src/hub/index.js'),
    deck: path.resolve(__dirname, 'src/deck/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(isProduction ? [
      'dist/scripts',
      'dist/styles',
    ] : []),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/deck/index.html'),
      filename: 'deck/index.html',
      excludeChunks: ['hub'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hub page',
      filename: 'hub/index.html',
      chunks: ['hub'],
      minify: {
        collapseWhitespace: true,
      },
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, './dist/'),
  },
}
