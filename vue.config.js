// vue.config.js
module.exports = {
  lintOnSave: true,

  pwa: {
    workboxOptions: {
      importScripts: ['sw-push-notifications.js']
    }
  },

  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },

  devServer: {
    host: '127.0.0.1'
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
