const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Unknown bug when UglifyJSPlugin enabled:
  // ERROR in app.bundle.js from UglifyJs
  // Unexpected token: operator(>) [app.bundle.js:54333, 22]
  // plugins: [new UglifyJSPlugin()]
});