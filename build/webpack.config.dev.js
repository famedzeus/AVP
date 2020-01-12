'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    hot: false,
    watchOptions: {
      poll: true
    }
  },  
    // resolve: {
    //   extensions: [ '.tsx', '.ts', '.js' ],
    // },  
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },      
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'sass-loader',
          //   // Requires sass-loader@^7.0.0
          //   options: {
          //     implementation: require('sass'),
          //     fiber: require('fibers'),
          //     indentedSyntax: true // optional
          //   },
          //   // Requires sass-loader@^8.0.0
          //   options: {
          //     implementation: require('sass'),
          //     sassOptions: {
          //       fiber: require('fibers'),
          //       indentedSyntax: true // optional
          //     }
          //   }
          // }          
        ]
      }
 
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({filename:'index.html',template:'index.html',inject:true})
  ]
}