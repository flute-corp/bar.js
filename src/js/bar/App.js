(function ($, O2) {
    /**
     * @property bar.App
     */
    O2.createClass('bar.App', {
        oView : null,
        oCtrl : null,

        __construct : function() {
            this.oView = new bar.View();
            this.oCtrl = new bar.Ctrl(this.oView);
        }
    });
})(jQuery, O2);