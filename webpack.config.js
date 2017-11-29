const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  entry: './src/class-dll.js',
  output: {
    library: "DoublyLinkedList",
    libraryTarget: "umd",
    filename: './dist/class-dll.dist.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ]
}
