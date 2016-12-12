var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    StyleLintPlugin = require('stylelint-webpack-plugin'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    BASE_PATH = './',
    SCSS_PATH = BASE_PATH + 'scss',
    Styles_PATH = BASE_PATH + 'styles',
    SCRIPTS_PATH = BASE_PATH + 'scripts',
    SRC_PATH = BASE_PATH + 'js';

require('core-js');

module.exports = {
	context: path.join(__dirname,'./'),
	resolve: {
		modulesDirectories: ["node_modules", "js", "scss"],
		extensions: ["", ".js", ".jsx", ".scss"]
	},
	entry: {
		index: [
			__dirname + "/scss/style.scss",
			__dirname + "/js/index.js"
		]
	},
	devtool: "source-map",
	output: {
		path: __dirname + '/dist/js/',//Absolute path
		publicPath: '/dist/js/',
		filename: "[name].js",
		sourceMapFilename: "[file].map"
	},
	module: {
		preLoaders: [
			/** js linting **/
      		{
      			test: /\.js$/,
      			exclude: /node_modules/,
      			include : [__dirname + '/js'],
      			loader: "eslint-loader"
      		}
    	],
		loaders: [
			/** ES6 transpiling **/
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				include : [__dirname + '/js'],
				loaders: ['babel-loader?presets[]=es2015,presets[]=react']
			},
			/** SCSS compiling, autoprefixing, linting **/
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?pack=cleaner!sass-loader?sourceMap=true&sourceMapContents=true')
			},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
		]
	},
	postcss: function () {
		return {
			defaults: [precss, autoprefixer],
			cleaner:  [autoprefixer({browsers: ["last 2 versions"]})]
		};
	},
	plugins: [
		new ExtractTextPlugin('../css/style.css'),
		new StyleLintPlugin({
	        syntax: 'scss'
	    })
	]
};