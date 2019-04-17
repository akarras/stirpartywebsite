const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/js/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: { presets: ['@babel/preset-env'] }
      }, {
        test: /\.glsl$/,
        use: 'raw-loader'
      }, {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(html|json|txt|dat|gif|jpg|png|svg|eot|ttf|fbx|glb|gltf|ogg)$/i,
        use: [{
          loader: 'file-loader',
          options: { 
            name: '[name].[ext]',
            outputPath: (url, resourcePath, context) => {
              console.log(url);
              return resourcePath.includes("/assets/")||resourcePath.includes("\\assets\\") ?`assets/${url}` : url
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.css',
    })
  ]
};
