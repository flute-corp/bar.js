(function ($, O2) {
    /**
     * @property bar.Ctrl
     */
    O2.createClass('bar.Ctrl', {
        $nbCarte : null,
        $diviser : null,
        $reset: null,
        // $algoSelector : null,
        oView : null,
        __construct : function(oView) {
            var self = this;
            if (!oView) { return; }
            this.oView = oView;
            this.$contentWrapper = $('#contentWrapper');
            // Reset
            this.$reset = $('#reset')
                .on('click', function() {
                    var holdForm = self.$contentWrapper.serializeObject();
                    self.$contentWrapper[0].reset();
                    self.$contentWrapper.trigger('change');
                    var $toast = $('<span>La commande a été vidée </span>');
                    $('<a>Annuler</a>').appendTo($toast)
                        .on('click', function() {
                            self.$contentWrapper.deserializeObject(holdForm);
                            Vel(
                                $(this).closest('.toast'),
                                {
                                    "opacity": 0,
                                    marginTop: '-40px'
                                },
                                {
                                    duration: 375,
                                    easing: 'easeOutExpo',
                                    queue: false
                                }
                            );
                        });
                    Materialize.toast($toast, 4000);
                });
            this.$nbCarte = $('#nbCarte');
            // this.$algoSelector = $('#algoSelector');
            this.$restore = $('#restore')
                .on('click', function() {
                    var oHistory = bar.helper.storage.import();
                    oView.showHistory(oHistory);
                });
            this.$diviser = $('#diviser')
                .on('click', function() {
                    var val = +self.$nbCarte.val();
                    // var algo = self.$algoSelector.val();
                    var oCommande = self.$contentWrapper.serializeObject();
                    oCommande = new bar.Commande(oCommande);
                    oView.showFacture(oCommande, val);
                });
            $('input[type=number]')
                .on('click', function() {
                    this.select();
                })
                .on('change', function() {
                    if (+$(this).val() < 0) {
                        Materialize.toast('Le bar ne fait pas crédit !', 2000);
                        $(this).val(0);
                    }
                });
            $('select').material_select();
            $('.splash').addClass('disappear');

            $('.help').on('click', function(e) {
                e.preventDefault();
                self.discover();
            });
            if (!localStorage.getItem('bar')) {
                this.discover();
            }
            this.$contentWrapper.on('change', function() {
                var oForm = self._serializeForm();
                if (!$.isEmptyObject(oForm)) {
                    self.$diviser.removeClass('scale-out').addClass('scale-in');
                    self.$reset.removeClass('scale-out').addClass('scale-in');

                    self.$restore.removeClass('scale-in').addClass('scale-out');
                } else {
                    self.$diviser.removeClass('scale-in').addClass('scale-out');
                    self.$reset.removeClass('scale-in').addClass('scale-out');

                    self.$restore.removeClass('scale-out').addClass('scale-in');
                }
            })
        },
        _serializeForm : function() {
            var oForm = this.$contentWrapper.serializeObject();
            if (oForm.cmd) {
                oForm.cmd = oForm.cmd.filter(function(val) {
                    return +val;
                });
                if (!oForm.cmd.length) {
                    delete oForm.cmd;
                }
            }
            return oForm;
        },
        discover: function() {
            var id;
            if (this.$diviser.hasClass('scale-in')) {
                id = 'diviser';
            } else {
                id = 'restore';
            }
            $('.tap-target[data-activates="'+ id +'"]').tapTarget('open');
        }
    });
})(jQuery, O2);