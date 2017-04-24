module.exports = {
	entry: './src/js/app.js',
	output: {
		path: `${__dirname}/dest`,
		filename: 'api.js'
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [
			{test: /\.css$/, loader: "style-loader!css-loader"},
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query:{presets:['es2015']}}
		]
	}
}