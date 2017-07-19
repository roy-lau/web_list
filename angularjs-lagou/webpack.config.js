var webpack = require("webpack");
var postcss = require("postcss");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin; // 减小js体积
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './script/app.js',
        services: './script/services/cache.js',
        filter: './script/filter/filterByObj.js',
        directive: ['./script/directive/compary.js', './script/directive/foot.js', './script/directive/head.js', './script/directive/headBar.js', './script/directive/positionClass.js', './script/directive/positionInfo.js', './script/directive/positionList.js', './script/directive/sheet.js', './script/directive/tab.js'],
        controller: ['./script/controller/companyCtr.js', './script/controller/favoriteCtr.js', './script/controller/loginCtr.js', './script/controller/mainCtr.js', './script/controller/meCtr.js', './script/controller/positionCtr.js', './script/controller/postCtr.js', './script/controller/registerCtr.js', './script/controller/searchCtr.js'],
        config: ['./script/config/dict.js', './script/config/router.js']
    },
    //入口文件输出配置
    output: {
        filename: 'dist/js/[name].js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style!css?importloaders=1!postcss'
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less',
               query:{
                name: 'dist/css/[name]-[hash:5].css'
            }

        }, {
            test: /\.(png|jpg|gif|svg)$/i,
            use: [
                'url-loader?linit=10000&name=dist/imgs/[name]-[hash:5].[ext]',
                'image-webpack'
            ],
            query:{
                name: 'dist/imgs/[name]-[hash:5].[ext]'
            }
        }],
	  // postcss: [
	  //     require('autoprefixer')({
	  //         broswers: ['lest 5 verions']
	  //     })
	  // ],
    },
    plugins: [
        new uglifyJsPlugin(), // 压缩js
        new HtmlwebpackPlugin({ // 在index.html文件中加入title 'Webpack-demos',将打包好的js文件script到HTML中
            title: 'angular-拉钩',
            filename: 'dist/index.html',
            template: 'index.html', // 模板html
            inject: 'html'   // 设置script标签插入的位置
        })
    ]
}
