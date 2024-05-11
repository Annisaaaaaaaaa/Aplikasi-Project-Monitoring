const path = require('path');

module.exports = {
  entry: './src/index.js', // Lokasi file masukan utama (entry point)
  output: {
    path: path.resolve(__dirname, 'dist'), // Lokasi folder output
    filename: 'bundle.js' // Nama file output
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
  // Aturan-aturan untuk pemrosesan berkas
  module: {
    rules: [
      {
        test: /\.js$/, // Berlaku untuk berkas JavaScript
        exclude: /node_modules/, // Kecualikan berkas dari node_modules
        use: {
          loader: 'babel-loader', // Gunakan babel-loader untuk transpilasi ES6+
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Preset Babel untuk transpilasi ES6+ dan React
          }
        }
      }
    ]
  },
  // Opsi tambahan jika diperlukan
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html' // Lokasi template HTML
  //   })
  // ]
};
