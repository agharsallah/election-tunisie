var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var Autoprefixer = require('less-plugin-autoprefix');

var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [    {
            test: /\.scss$/,
            loaders: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },{
      test: /\.css$/,
      loaders: [
        "style-loader",
        "css-loader"
      ]
    },
          {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    },
    { test: /\.less/, loader: 'style-loader!css-loader!postcss-loader!less-loader', exclude: /node_modules/ }

]
  },
    lessLoader: {
    lessPlugins: [
      new Autoprefixer({
        browsers: ['last 2 versions', "ie >= 10"]
      })
    ]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;