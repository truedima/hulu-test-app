const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your modules
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // Or 'development' for unminified output
};
