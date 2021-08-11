module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css']
    },
    externals: {
        config: "config"
    },
    rules: {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        }
    }
};
