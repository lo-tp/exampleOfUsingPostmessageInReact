module.exports = {
  entry: './src/client.jsx',
  debug: true,
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.yml$/,
        loader: 'yml',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
  },
};
