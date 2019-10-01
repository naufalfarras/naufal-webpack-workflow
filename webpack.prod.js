const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
   mode: 'production',
   output: {
      filename: '[name]-[contentHash].js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     importLoaders: 2
                  }
               },
               {
                  loader: 'postcss-loader',
                  options: {
                     ident: 'postcss',
                     plugins: [require('tailwindcss')(), require('autoprefixer')(), require('cssnano')()]
                  }
               },
               {
                  loader: 'sass-loader',
                  options: {
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
                  name: '[path][name]-[contentHash].[ext]'
               }
            }
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name]-[contentHash].css'
      })
   ],
   optimization: {
      splitChunks: {
         chunks: 'all'
      }
   }
});
