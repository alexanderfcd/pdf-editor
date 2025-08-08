module.exports = {
  entry: {
    main: './index.js',
    libs: './libs.js',
  },
  output: {
    filename: './[name].js',
  },
  devServer: {
    watchFiles: [
      "js/**/*",
      "css/**/*"
    ],
    historyApiFallback: {
      index: './index.html'
    },
    historyApiFallback: true,
    hot: true,
    compress: false, 
      static: {
    directory: "./"
  },
    
  },

 
};