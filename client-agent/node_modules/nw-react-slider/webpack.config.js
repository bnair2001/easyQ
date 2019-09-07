var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

var config = {
  entry: [
    __dirname + '/src/slider.less',
    __dirname + '/src/slider.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'nw-react-slider.js',
    library: 'NWReactSlider',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    }
  },
  plugins: [
    new ExtractTextPlugin('nw-react-slider.css')
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        'presets': ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
    }]
  },
  postcss: function () {
    return [autoprefixer]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.less']
  }
}

if (process.env.NODE_ENV === 'production') {
  config.output.filename = 'nw-react-slider.min.js'
  config.plugins = [
    new ExtractTextPlugin('nw-react-slider.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = config
