const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
   entry: {
      app: './src/js/main.js'
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: ['html-loader']
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html'
      }),
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery'
      })
   ]
};
