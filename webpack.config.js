var path = require('path');
var glob = require('glob');


module.exports = {
  entry: {
    main: './index.js',
    libs: './libs.js',
    modules: glob.sync('./modules/**/*.js').map(path => `./${path}`),
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