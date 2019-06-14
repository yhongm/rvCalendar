const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
  entry: './src/RVcalendar.js',
  mode: "production",
  // devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }
  ]
  }
};