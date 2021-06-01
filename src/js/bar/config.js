(function ($, O2) {
  /**
   * @property bar.config
   */
  O2.createObject('bar.config', {
    STORAGE_KEY: 'bar',
    API_URL: (window.location.hostname === 'localhost' ? 'api/web/app_dev.php/' : 'api/web/')
  })
})(jQuery, O2)
