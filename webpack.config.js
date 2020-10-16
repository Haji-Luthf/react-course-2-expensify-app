// Path is built-in module 
// This function is preferred over String concatenation so that it’s platform independent. 
const path = require('path');
// Extract-text-webpack-plugin is used to extract all text of css out of bundle.js to reduce its size further and dump it into a separate css file.
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// process.env.NODE_ENV is an environment variable that stores the environment you are in.
// Heroku will automatically set this to 'production'
// We have set this to 'test' in package.json for the test script.
// So it's not available it is development environment.

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});
} else if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

// The module.exports property will hold an object which will contain configuration details for the Webpack.
// This property is used to expose this object to other files.

// module.exports explanation:
// entry - specifying entry point of our application
// output - specifying where to generate the final bundled file
// path - To join absolute path to the local path of public folder.
// loader - Webpack will compile the JSX into regular javascript code (ES6 to ES5) using the technique of loader.
// A loader lets you customize the behavior of Webpack when it loads a given file.
// babel-loader - Webpack plugin which enables Webpack to run babel for a given type of files
// /\.js$/ - // Regular expression for all files ending with .js
// style-loader - for inline styles
// sass-loader - to convert scss to css which the browser understands
// Source maps are useful not only to debug errors but also to get code information if something is printed successfully to the console
// cheap-module-eval-source-map - This will help Developers in debugging. Mentions the line number of actual file instead of bundle.js (compiled code of ES5)
// devServer - comes with features like speeding up the process of loading changes to the screen, auto refresh of webpack config changes.
module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill', //for compatibility with older browsers (example includes is not supported in old browsers)
    './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/, // REGEX for all files ending with .js. Need not use .js in the import statements.
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: { // for development mode to show correct source file for styles
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASURMENT_ID': JSON.stringify(process.env.FIREBASE_MEASURMENT_ID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // to reload index.html everytime we get a 404
      publicPath: '/dist/' // bundled assets location
    }
  };
};
