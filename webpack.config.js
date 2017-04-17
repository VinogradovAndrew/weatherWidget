let webpack = require('webpack');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-object-rest-spread'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: {
            index: './public/index.html'
        }
    }
}
;
