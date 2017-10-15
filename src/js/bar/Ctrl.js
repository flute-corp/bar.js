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
                    var holdForm = self._serializeForm();
                    self.$contentWrapper[0].reset();
                    self.$contentWrapper.trigger('change');
                    self.$contentWrapper.find('input').trigger('change');
                    Materializer.toast({
                        toast : {
                            message : 'La commande a été vidée'
                        },
                        btn : [
                            {
                                label: 'Annuler',
                                color: 'red',
                                click: function() {
                                    self.$contentWrapper.deserializeObject(holdForm);
                                }
                            }
                        ]
                    });
                });
            this.$nbCarte = $('#nbCarte');
            // this.$algoSelector = $('#algoSelector');
            this.$restore = $('#restore')
                .on('click', function() {
                    var oHistory = bar.helper.storage.import();
                    delete oHistory.tmp;
                    oView.showHistory(oHistory);
                });
            this.$diviser = $('#diviser')
                .on('click', function() {
                    var val = +self.$nbCarte.val();
                    // var algo = self.$algoSelector.val();
                    var oCommande = self._serializeForm();
                    oCommande = new bar.Commande(oCommande);
                    oView.showFacture(oCommande, val);
                });

            $('.help').on('click', function(e) {
                e.preventDefault();
                self.discover();
            });
            this.$contentWrapper.on('change', function() {
                var oForm = self._serializeForm();
                if (oForm.cmd) {
                    oForm.cmd = oForm.cmd.filter(bar.helper.filter.empty);
                    if (!oForm.cmd.length) {
                        delete oForm.cmd;
                    }
                }
                if ($.isEmptyObject(oForm)) {
                    self.$diviser.removeClass('scale-in').addClass('scale-out');
                    self.$reset.removeClass('scale-in').addClass('scale-out');

                    self.$restore.removeClass('scale-out').addClass('scale-in');

                    bar.helper.storage.export({'tmp': null });
                } else {
                    self.$diviser.removeClass('scale-out').addClass('scale-in');
                    self.$reset.removeClass('scale-out').addClass('scale-in');

                    self.$restore.removeClass('scale-in').addClass('scale-out');

                    bar.helper.storage.export({'tmp': self._serializeForm() });
                }
            });

            this.init();
        },
        init: function () {
            var self = this;
            Materializer.ajax(bar.config.API_URL)
                .done(function (data) {
                    bar.store = data;
                    Materializer.ajax(bar.config.API_URL +'login')
                        .done(function (data) {
                            if (data) {
                                console.log(data);
                            } else {

                            }
                        });
                })
                .always(function () {
                    self.oView.showHome();
                    self.oView.makeUserAddons();

                    $('input[type="number"]')
                        .on('click', function() {
                            this.select();
                        })
                        .on('change', function() {
                            var $this = $(this);
                            if (+$this.val() < 0) {
                                Materialize.toast('Le bar ne fait pas crédit !', 2000);
                                $this.val(0);
                            }
                            var $cBody = $this.closest('.collapsible-body');
                            var tot = $cBody.find('input').serializeArray().reduce(function(a, v) {
                                return a + (+v.value);
                            }, 0);
                            $cBody.siblings('.collapsible-header').find('.badge').text(tot ? tot:'');
                        });
                    $('select').material_select();

                    var oStorage = bar.helper.storage.import();
                    if (oStorage) {
                        if (oStorage.tmp) {
                            self.$contentWrapper.deserializeObject(oStorage.tmp);
                            Materialize.toast('Commande temporaire restaurée', 2000);
                        }
                    } else {
                        this.discover();
                    }
                    self.$contentWrapper.materializeLayout();
                    $('.splash').addClass('disappear');
                });
        },
        _serializeForm : function() {
            return this.$contentWrapper.serializeObject();
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