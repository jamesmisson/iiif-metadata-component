const path = require("path");

function resolvePath(p) {
    return path.resolve(__dirname, p)
}

const config = {
    entry: {
        'IIIFMetadataComponent': ['./src/index.ts']
    },
    externals: {
        'node-fetch': 'node-fetch',
        'fetch-cookie/node-fetch': 'fetch-cookie/node-fetch',
        'form-data': 'form-data',
        'url': 'url'
    },
    output: {
        path: resolvePath('dist-umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'IIIFMetadataComponent',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6784#issuecomment-375941431
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}

if (process.env.NODE_WEBPACK_LIBRARY_PATH) {
    config.output.path = resolvePath(process.env.NODE_WEBPACK_LIBRARY_PATH);
}

if (process.env.NODE_WEBPACK_LIBRARY_TARGET) {
    config.output.libraryTarget = process.env.NODE_WEBPACK_LIBRARY_TARGET;
}

module.exports = config;
