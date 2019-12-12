const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
					presets: ['@babel/env', '@babel/react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         sourceMap: true,
                    //         config: {
                    //             path: `${PATHS.src}/js/postcss.config.js`
                    //         }
                    //     }
                    // }
                ]

            },
            // {
            //     test: /\.sass$/,
            //     use: [
            //         'style-loader',
            //         MiniCssExtractPlugin.loader,
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 sourceMap: true
            //             }
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 sourceMap: true,
            //                 config: {
            //                     path: `${PATHS.src}/js/postcss.config.js`
            //                 }
            //             }
            //         },
            //         {
            //             loader: 'sass-loader',
            //             options: {
						// 	sourceMap: true
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg|)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]'
            //     }
            // },
            // {
            //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]'
            //     }
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        // new CopyWebpackPlugin([
        //     // {
        //     //     from: `${PATHS.src}/img`,
        //     //     to: `${PATHS.assets}img`
        //     // },
        //     {
        //         from: `${PATHS.src}/fonts`,
        //         to: `${PATHS.assets}fonts`
        //     },
        //     // {
        //     //     from: `${PATHS.src}/static`,
        //     //     to: ``
        //     // },
        // ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        })
    ]
}
