var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const CompressionPlugin = require('compression-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    context: __dirname,
    entry:  {
        main:'./static/index',
        chat:'./static/chat',
    },
    output: {
        path: path.resolve('./static/webpack_bundles/'),
        filename: '[name].js',
    },
    mode: 'production',
    plugins: [
        new VueLoaderPlugin(),
        new CompressionPlugin({
            filename: '[path]',
              test: /\.(js|css)$/,
              algorithm: 'gzip',
                minRatio: 0.8,
            deleteOriginalAssets: false
    }),
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.GRAPHQL_API_URL': JSON.stringify(process.env.GRAPHQL_API_URL),
    }),
        new S3Plugin({
            progress:true,
      s3Options: {
        accessKeyId: process.env.NODE_ACCESS,
        secretAccessKey: process.env.NODE_SECRECT,
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: process.env.NODE_BUCKET,
          // Here we set the Content-Encoding header for all the gzipped files to 'gzip'
        ContentEncoding(fileName) {
            if (/main\.js/.test(fileName)) {
            return 'gzip'
          }
            if (/chat\.js/.test(fileName)) {
            return 'gzip'
          }
        },
        // Here we set the Content-Type header for the gzipped files to their appropriate values, so the browser can interpret them properly
        ContentType(fileName) {
          if (/\.css/.test(fileName)) {
            return 'text/css'
          }
          if (/\.js/.test(fileName)) {
            return 'text/javascript'
          }
        },
        CacheControl(fileName) {
          return "public, max-age=600"
          },
      },
        basePath: '/',
        directory: path.resolve('./static/'),
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
    resolve: {
        alias: {vue: 'vue/dist/vue.min.js'}
        //alias: {vue: 'vue/dist/vue.js'}
    },


};


