var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var merge = require('utils-merge');

var configBase = {
    module: {
        loaders: [{
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ["transform-runtime",
                        'transform-decorators-legacy'
                    ]
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /\.(jpe?g|png|jpg|eot|woff|ttf|svg|gif)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            }
        ]
    },
    postcss: [
        require('postcss-px2rem')({
            remUnit: 37.5
        }),
        require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions']
        }),
        require('cssnano')()
    ],
    plugins: [
        new ExtractTextPlugin("[name]/[name].wxss", {
            allChunks: true
        })
    ]
}
var sassBasePath = 'sass';
var entryBasePath = 'scripts';
var outpath = 'src/utils';
var sassOutPath = 'src/pages'
var fs = require('fs');

var configs = fs.readdirSync(path.join(__dirname, entryBasePath)).filter(function(dirname) {
    return /\.js[x]?$/.test(dirname)
}).map(function(name) {
    var config = {};
    merge(config, configBase);

    config.entry = path.join(__dirname, entryBasePath, name);
    config.output = {
        path: path.resolve(__dirname, outpath),
        filename: name,
        libraryTarget: 'commonjs2'
    }
    return config;
})


var sassConfig = {
    entry: {}
};
fs.readdirSync(path.join(__dirname, sassBasePath)).filter(function(dirname) {
    return /\.scss$/.test(dirname)
}).forEach(function(name) {
    var filename = name.split('.')[0];
    sassConfig.entry[filename] = path.join(__dirname, sassBasePath, name);
    sassConfig.output = {
        path: path.resolve(__dirname, sassOutPath),
        filename: '../../lib/scss.js'
    }
})
if (sassConfig.output) {
    merge(sassConfig, configBase);
    configs.push(sassConfig);
}

module.exports = configs;
