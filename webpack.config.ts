import path from 'path';
import { Configuration } from 'webpack'; // eslint-disable-line no-unused-vars
import Dotenv from 'dotenv-webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const isProduction: boolean = process.env.NODE_ENV === 'production';

const distDir: string = 'dist';

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    deck: path.resolve(__dirname, 'src/deck/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, distDir),
    filename: 'scripts/[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(
      isProduction
        ? [path.join(distDir, 'scripts'), path.join(distDir, 'styles')]
        : []
    ),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/deck/index.html'),
      filename: 'deck/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, distDir),
  },
};

export default config;
