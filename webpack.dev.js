const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
   mode: 'development',
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               'style-loader',
               {
                  loader: 'css-loader',
                  options: {
                     sourceMap: true,
                     importLoaders: 2
                  }
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     ident: 'postcss',
                     sourceMap: true,
                     plugins: [require('tailwindcss')(), require('autoprefixer')()]
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                     sassOptions: {
                        fiber: require('fibers')
                     }
                  }
               }
            ]
         },
         {
            test: /\.(png|jpg|svg|gif|ttf|otf|woff|woff2)$/,
            use: {
               loader: 'file-loader',
               options: {
                  context: path.resolve(__dirname, 'src'),
                  name: '[path][name].[ext]'
               }
            }
         }
      ]
   },
   plugins: [new webpack.HotModuleReplacementPlugin()],
   devServer: {
      hot: true,
      clientLogLevel: 'none'
   }
});
