module.exports = {
	entry: 'script/**/*.js',
	output: 'dist/js/[name].js',
	module:{
		rules:[{
			test: /\.css$/,
			loader:'style!css?importloaders=1!postcss'
		},{
			test:/\.less/,
			loader: 'style!css!postcss!less'
		},{
			test:/\.(png|jpg|gif|svg)$/i,
			use:[
				'url-loader?linit=10000&name=dist/imgs/[name]-[hash:5].[ext]',
				'image-webpack'
			]
		}]
	},
	postcss:[
		require('autoprefixer')({
			broswers:['lest 5 verions']
		})
	],
	plugins: [
        new uglifyJsPlugin(),/* 压缩js */
        new HtmlwebpackPlugin({ // 在index.html文件中加入title 'Webpack-demos',将打包好的js文件script到HTML中
            title: 'angular-拉钩',
            filename: 'index.html'
        })
    ]

}