const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (_env, options) => {
    const devMode = options.mode !== "production"
    const mode = options.mode ? options.mode : "none"

    return {
        stats: "minimal",
        mode,
        devtool: devMode ? "eval-cheap-module-source-map" : undefined,
        optimization: {
            minimizer: [
                new TerserPlugin({}),
                new CssMinimizerPlugin({})
            ]
        },
        entry: {
            bundle: "./src/index.js"
        },
        output: {
            filename: "./js/[name].js",
            path: path.resolve(__dirname, "./dist"),
            publicPath: "/"
        },
        module: {
            rules: [
                // Load javascript
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                // Load stylesheets
                {
                    test: /\.[s]?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                // Load images
                {
                    test: /\.(png|svg|jpe?g|gif)(\?.*$|$)/,
                    type: "asset/resource",
                    generator: {
                        filename: "./images/[hash][ext][query]"
                    }
                },
                // Load fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "./fonts/[hash][ext][query]"
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "./css/app.css" }),
        ]
    }
}