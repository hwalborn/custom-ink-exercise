const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const huh = new ExtractTextPlugin();

module.exports = {
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".less"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' }
                ],
            }

        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    }
}