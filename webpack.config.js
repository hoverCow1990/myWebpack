//所有需要引用到的模块
var webpack 		    =  require("webpack"),
	path    		    =  require("path"),
	paths   		    =  require("./config/paths.js")		       //所有的需要文件的路径依赖
	url     		    =  require('url'),
	fs 				    =  require('fs'),
	CommonsChunkPlugin  =  webpack.optimize.CommonsChunkPlugin,
	HtmlWebpackPlugin   =  require('html-webpack-plugin'),         //生成最终的Html5文件
	ExtractTextPlugin   =  require('extract-text-webpack-plugin'),	//生成css文件
	CleanWebpackPlugin  =  require('clean-webpack-plugin');   		//清除文件夹

//定义环境路径
var srcDir              =  path.join(__dirname, './src');     //开发环境
var distDir             =  path.join(__dirname, './dist');	  //开发测试环境

//定义文件路径
var entryPath           =  path.join(srcDir + "/main");
var htmlPath            =  path.join(srcDir + "/view");

//定义公共引用路径,这样设置可以在package.json文件中直接用homepage进行定义..
var homepagePath        =  require(paths.appPackageJson).homepage;
var homepagePathname    =  homepagePath ? url.parse(homepagePath).pathname : '/';
var publicPath          =  homepagePathname; 

//入口文件
var entryDir            =  {}; //entry入口
var htmlDir             =  [];	//html入口

//对入口进行注入值
fs.readdirSync(htmlPath, 'utf8').forEach((name) => {  		//name为所有文件夹或者文件的名字文件的话带有后缀
    var name = name.match(/^[^\.]+/)[0];					//匹配文件的名字如index.html,则为index	
    //js文件入口
    entryDir[name] = path.join(entryPath,name + ".js");		//逐条生成entry入口,如entry.index = index.js
    //html文件生成
    htmlDir.push(new HtmlWebpackPlugin({					// 输出文件位置  **需要npm install html-webpack-plugin --save-dev插件
        template: `${htmlPath}/${name}.html`,				// 需要引入的html文件路径
        filename: `view/${name}.html`,						// 导出文件目录 如下如为/view/index.html  由于
        //minify: true,										// 是否压缩
        chunks: ["comment",name],							// 需要加载的入口js文件 comment为届时导出的共同js
    }));
});

var pluginsArr = Array.prototype.slice.call([]).concat(htmlDir);

pluginsArr = pluginsArr.concat([		
	new CleanWebpackPlugin(['dist']),					
	new webpack.HotModuleReplacementPlugin(),				
	new webpack.optimize.CommonsChunkPlugin({
		names: "comment",   //['index','login']
	    filename: 'js/comments-[hash].js',    
	    chunks: ['index','login'],
	    minChunks: Infinity //3-5
	}),
	new ExtractTextPlugin('css/[name].css',{allChunks: true}),
	new webpack.optimize.UglifyJsPlugin({   //压缩js
        compress: {
          warnings: false
        }
    }),
]);


var webpackConfig = {
	devtool: "source-map",
	entry : Object.assign(
		entryDir,
		{"comment" : ["jquery"]}
	),
	output : {
		path: distDir, 					//输出路径,需传入绝对路径
	    filename: "js/[name].js",		//输出文件名,需要输出到JS文件夹下路径加在了filename中//publicPath: '/', //指定引用路径,在服务器模式下使用才会表现正常
	    publicPath: publicPath,   		//"file:///E:/study/webpack-Demo2/dist/"									
	},
	plugins : pluginsArr,
	devServer: {
	    contentBase: distDir,			//本地服务器所加载的页面所在的目录 **需要$ npm install webpack-dev-server --save-dev
	    colors: true,					//终端中输出结果为彩色
	    historyApiFallback: true,
	    port : 8080,
	    inline: true 					// 对应ifram模式, 显示路径
  	},
  	module : {
    	loaders: [
	    	{
	            test: /\.(js|jsx)$/,			    //匹配js结尾的文件
		        include: /src/,			   			//只解析那个路径下的模块 exclude: /node_modules/不解析某个模块下的文件
		        loader: 'babel',           			//普通**需要npm install babel-loader babel-core babel-preset-es2015 --save-dev
		        query: {				   
		          presets: ['es2015','react']	    //react**需要 npm install babel-core babel-loader  babel-preset-es2015 babel-preset-react --save-dev
		        }
	        },
	        {
	        	test: /\.css$/, 
	        	loader: ExtractTextPlugin.extract('style', 'css')		   		//**需要 npm install css-loader style-loader html-loader --save-dev
	       	}, 
	        {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!less')		//需要安装css-loader style-loader html-loader less-loader node-less less extract-text-webpack-plugin
            },
            {
                test: /\.(png|jpe?g)$/,											//**需要 npm install url-loader file-loader --save-dev
                loader: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]' // 如果文件小于8kb那么则用base64方式添加到页面中  大于则放到文件夹中
            },
		],
    },
}

module.exports = webpackConfig;

module : {
    	loaders: [
	        {
	        	test: /\.css$/, 
	        	loader: ExtractTextPlugin.extract('style', 'css'),		   	
	        {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!less'),
            },
		],
},