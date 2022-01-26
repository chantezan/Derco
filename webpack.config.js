var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');



const autoprefixer = require("autoprefixer");


module.exports = {
    context: __dirname,
    entry:  {
        main:'./static/index',
        chat:'./static/chat',
    },
    mode: 'development',
    output: {
        path: path.resolve('./static/webpack_bundles/'),
        filename: '[name].js',
        publicPath: 'http://localhost:8082/',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
        cache: true,
      })],
    },

     plugins: [
            new VueLoaderPlugin(),
            new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

  ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                    options: {
          presets: ['@babel/preset-env']
        }
                },
              },
            {
        test: /\.css$/i,
        use: [ "css-loader"],
      },
             {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader','postcss-loader']},
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
            },
            {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          esModule: false,
        },
      },
        ],
    },

    devServer: {
       watchOptions: {
           aggregateTimeout: 5000,
            poll: 5000,
           ignored: /node_modules/
        },
    hot: true,
    quiet: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
    resolve: {
        //alias: {vue: 'vue/dist/vue.min.js'}
        alias: {vue: 'vue/dist/vue.js'}
    },


};


