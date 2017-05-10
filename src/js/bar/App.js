(function ($, O2) {
    /**
     * @property bar.App
     */
    O2.createClass('bar.App', {
        __construct : function() {
            var oView = new bar.View();
            new bar.Ctrl(oView);
        }
    });
})(jQuery, O2);