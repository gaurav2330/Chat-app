const path = require('path')

module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
        "fs": false,
        "async_hooks": false,
        "bufferutil": false,
        "utf-8-validate": false
    },
    extensions: ['', '.js', '.jsx', '.css'],
  //   modules: ['node_modules']
  },
  entry: {
    app: './src/index.js',
    bootstrap: './bootstrap.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style_loader', 'css_loader']
      }
    ]
  }
}