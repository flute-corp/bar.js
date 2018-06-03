// vue.config.js
module.exports = {
  lintOnSave: true,
  pwa: {
    workboxOptions: {
      importScripts: ['sw-push-notifications.js']
    }
  }
}
