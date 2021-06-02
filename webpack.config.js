const path = require("path")
const Webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

// Dev server
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (_env, options) => {
    const devMode = options.mode !== "production"
    const mode = options.mode ? options.mode : "none"

    return {
        stats: "minimal",
        mode,
        devtool: devMode ? "eval-cheap-module-source-map" : undefined,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    defaultVendors: {

                        // test: /react|react-dom/,
                        // name: "vendor",
                        // chunks: "initial",
                        // enforce: true,

                        // test: /[\\/]node_modules[\\/]/,
                        
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: "vendor",
                        chunks: "all",
                    }
                }
            },
            minimizer: [
                new TerserPlugin({}),
                new CssMinimizerPlugin({})
            ]
        },
        entry: {
            bundle: "./src/index.js"
        },
        output: {
            filename: "js/[name].js",
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
                        filename: "./images/[contenthash][ext][query]"
                    }
                },
                // Load fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "./fonts/[contenthash][ext][query]"
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                inject: "body",
            }),
            new MiniCssExtractPlugin({ filename: "./css/app.css" }),
            new Webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            historyApiFallback: true,
            compress: true,
            open: true,
            hot: true,
            overlay: true,
            // port: 8080,
        }
    }
}