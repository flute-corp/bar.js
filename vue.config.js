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

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
