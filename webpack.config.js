const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/build');


const extractSass = new MiniCssExtractPlugin({
    filename: isProduction ? '[name].css' : '[name][hash].css',
});

const cssLoader = [
    MiniCssExtractPlugin.loader,
    {
        loader: "css-loader",
        options: {
            sourceMap: isDevelopment,
            minimize: isProduction,
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [require('autoprefixer')],
            sourceMap: 'inline'
        }
    }
];

const sassLoader = [
    MiniCssExtractPlugin.loader,
    {
        loader: "css-loader",
        options: {
            sourceMap: isDevelopment,
            minimize: isProduction,
        }
    },
    {
        loader: "resolve-url-loader"
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [require('autoprefixer')],
            sourceMap: 'inline'
        }
    },
    {
        loader: "sass-loader",
        options: {
            sourceMap: isDevelopment
        }
    }
];

const imageFileLoader = [{
    loader: 'file-loader',
    options: {
        name: isProduction ? 'img/[name].[ext]' : 'img/[name][hash].[ext]',
    }
}];

const optimizeImageLoader = [{
    loader: 'image-webpack-loader',
    options: {
        mozjpeg: {
            progressive: true,
            quality: 65
        },
        optipng: {
            enabled: false,
        },
        pngquant: {
            quality: '65-90',
            speed: 4
        },
        gifsicle: {
            interlaced: false,
        }
    }
}];

const imageLoader = isProduction ? imageFileLoader.concat(optimizeImageLoader) : imageFileLoader;

const config = {
    entry: {
        main: ["babel-polyfill", './src/js/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: distPath
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.html$/,
            exclude: /_templates/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: isProduction,
                    removeComments: false,
                    collapseWhitespace: false,
                    interpolate: true
                }
            }
        }, {
            test: /\.(js|jsx)$/,
            resolve: { 
                extensions: [".js", ".jsx"] 
            },
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.css$/, use: cssLoader
        }, {
            test: /\.(scss)$/,
            exclude: /node_modules/,
            use: sassLoader
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            include: [
                path.resolve(__dirname, "src/font-awesome/webfonts")
                //, Any other svg font path
            ],
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name][hash].[ext]'
                }
            },
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            exclude: [
                path.resolve(__dirname, "src/font-awesome/webfonts")
                //, Any other svg font path
            ],
            use: imageLoader,
        }, {
            test: /bootstrap\/dist\/js\/umd\//,
            use: 'imports-loader?jQuery=jquery'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
        new FaviconsWebpackPlugin(path.resolve(__dirname, "src/img/logo.svg")),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'Tether': 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
        })   
    ],
    optimization: isProduction ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                    },
                    comments: true,
                    mangle: false,
                },
            }),
        ],
    } : {},
    devServer: {
        contentBase: distPath,
        port: 9000,
        compress: true,
        open: true,
        historyApiFallback: true
    }
};

module.exports = config;