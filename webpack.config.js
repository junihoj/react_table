const path =require('path');

module.exports={
    entry:["@babel/polyfill",'./src/app.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename:'bundle.js',
    }, 
    module:{
        rules:[
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                }, 
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
        ]
    },
    mode: 'development',

    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
      historyApiFallback:true,
    },
    // resolve:{
    //     fallback:{
    //         "path":require.resolve("path-browserify"),
    //         "assert": require.resolve("assert/"),
    //         "util": require.resolve("util/"),
    //         "os": require.resolve("os-browserify/browser"),
    //     }

    // }
}
