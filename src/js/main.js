(function ($) {
    Date.prototype.toFrench = function () {
        var months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        function zeroInitial(n) {
            if (+n < 10) {
                return "0"+ n;
            }
            return n;
        }
        var output = zeroInitial(this.getDate()) + " " + months[this.getMonth()] + " " + this.getFullYear() +" à "+ zeroInitial(this.getHours()) +":"+ zeroInitial(this.getMinutes()) +":"+ zeroInitial(this.getSeconds());
        return output;
    };
    $(function() {
        var app = new bar.App();
    });
})(jQuery);