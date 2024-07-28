const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  mode: "production",
  optimization: {
    minimize: false,
    concatenateModules: false,
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false,
          beautify: true
        },
        keep_classnames: true,
        keep_fnames: true
      }
    })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    popup: './src/poupup/index.ts',
    script: './src/scripting/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
};


