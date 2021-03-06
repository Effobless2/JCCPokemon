module.exports = {
    context: __dirname + "/wwwroot/js/react",
    entry: {
        //Client :  "./Client/index.tsx",
        Admin  :  "./Admin/index.tsx"
    },
    output: {
        path: __dirname + "/wwwroot/js/dist/",
        filename: "[name]/bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_module)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react']
                    }
                }
            }
        ]
    }

}