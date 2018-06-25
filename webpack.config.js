const webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        main: path.join(__dirname, '/client/src/main.js'),
    },
    output: {
        path: __dirname + '/client/dist',
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.js$|.jsx$/,
            exclude: /node_modules/,
            loaders: 'babel-loader',
            options: {
                presets: [
                  require.resolve('babel-preset-react'),
                  [require.resolve('babel-preset-es2015'), { "modules": false }],
                ]
              }
        }, {
            test: /\.(scss|sass|css)$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|jpg|jpng|eot|ttf)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        }]

    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require("./client/dist/vendor.manifest.json"),
        }),
    ], devServer: {
        contentBase: path.resolve(__dirname, "client/dist"),
        historyApiFallback: true,
        inline: true,
        port: 9000,
        open: true
    }
};
