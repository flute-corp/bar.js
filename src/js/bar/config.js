(function ($, O2) {
    /**
     * @property bar.config
     */
    O2.createObject('bar.config', {
        STORAGE_KEY: 'bar',
        API_URL: (window.location.hostname === 'localhost' ? 'http://localhost/bar.php/web/app_dev.php/' : 'http://bar.nexk.fr/api/')
    });
})(jQuery, O2);