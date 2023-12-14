const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.pug',

  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'build'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },

  plugins: [
    new PugPlugin({
      pretty: true,
      filename: 'index.html',
      js: {
        filename: 'assets/js/bundle.js',
      },
      css: {
        filename: 'assets/css/styles.css',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: PugPlugin.loader,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/fonts'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.svg$/i,
        exclude: path.resolve(__dirname, 'src/assets/fonts'),
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
    ],
  },
};
