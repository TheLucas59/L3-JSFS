const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = true;

module.exports = {
	entry: './src/scripts/pong.js',
    mode: PRODUCTION ? 'production' : 'development',
	output: {
		path: path.resolve(__dirname, PRODUCTION ? '../server/public' : 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
		   publicPath: path.resolve(__dirname, 'dist'),
		   watch : true
		},
		host: 'localhost',
		port : 8888,
		open : true
	},
	plugins: [
		new HtmlWebpackPlugin({
		template: "./src/index.html",
		filename: "./index.html"
		}),
		new CopyPlugin({
			patterns: [
		  {
			from: 'src/scripts/*',
			to:   'scripts/[name][ext]'
		  },
		  {
			from: 'src/images/*',
			to:   'images/[name][ext]'
		  },
		  {
			from: 'src/style/*',
			to:   'style/[name][ext]'
		  }
			]
		 }),

	]
};
