const webpack = require('webpack');

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 5500,
        overlay:{
            warnings: true,
			errors: true,
			lazy: true
        }
    },
    // plugins: [
    //     new webpack.SourceMapDevToolPlugin({
    //         filename: '[file].map'
    //     })
    // ]
});

module.exports = new Promise((res, rej) => {
    res(devWebpackConfig);
});

