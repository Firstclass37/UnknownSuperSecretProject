const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]        
      }
    ],          
  },
  resolve: {    
    extensions: [ ".tsx", ".ts", ".js" ]    
  },
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new CopyPlugin([ { from: "./assets", to: "./assets" }, { from: "./node_modules/pixi.js/dist/pixi.min.js", to: "./pixi.min.js"} ])
  ]
};