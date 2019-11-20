// Dependencies
const withSass = require('@zeit/next-sass')
const TerserPlugin = require('terser-webpack-plugin')

// Webpack configuration
module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[name]__[local]___[hash:base64:5]'
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            safari10: true
          }
        })
      ]
    }

    return config
  }
})
