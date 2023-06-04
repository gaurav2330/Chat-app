const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    join_form: './public/js/join_chat_form.js',
    chat_window: './public/js/chat_window.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  devServer: {
    mimeTypes: { 'text/javascript': ['js'], 'text/html': ['phtml'] },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};
