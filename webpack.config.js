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
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(html|json|txt|dat|gif|jpg|png|svg|eot|ttf|woff|woff2|fbx|glb|gltf|ogg|mp4|in)$/i,
        use: [{
          loader: 'file-loader',
          options: { 
            name: '[name].[ext]',
            outputPath: (url, resourcePath, context) => {
              //console.log(url);
              if (resourcePath.includes("/images/")||resourcePath.includes("\\images\\")) {
                return `images/${url}`;
              } else if (resourcePath.includes("/webfonts/")||resourcePath.includes("\\webfonts\\")) {
                return `webfonts/${url}`;
              } else if (resourcePath.includes("/videos/")||resourcePath.includes("\\videos\\")) {
                return `videos/${url}`;
              } else if (resourcePath.includes(".in")) {
                return url.replace(/\.in$/i, "");
              }
              return url;
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.css'
    })
  ]
};
