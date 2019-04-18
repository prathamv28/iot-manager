const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, './app'),
        compress: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api': `http://${process.env.URL || 'localhost'}:${process.env.PORT || '8080'}`,
            'secure': false,
            'changeOrigin': true,
        },
        host: '0.0.0.0',
        port: 4200
    },
    module: {
        rules: [
        ]
    },
    resolve: {
        extensions: ['.js' , '.css']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    }
};
