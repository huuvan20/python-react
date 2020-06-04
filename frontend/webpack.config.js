module.exports = {
    mode: 'development',
    watch: false,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: ['dist/**', 'node_modules/**']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
};
