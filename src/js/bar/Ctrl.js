(function ($, O2) {
    /**
     * @property bar.Ctrl
     */
    O2.createClass('bar.Ctrl', {
        $nbCarte : null,
        $diviser : null,
        $reset: null,
        $login: null,
        // $algoSelector : null,
        oView : null,
        __construct : function(oView) {
            var self = this;
            if (!oView) { return; }
            this.oView = oView;
            this.$contentWrapper = $('#contentWrapper');
            // Reset
            this.$reset = $('#resetBtn')
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
            this.$restore = $('#restoreBtn')
                .on('click', function() {
                    var oHistory = bar.helper.storage.import();
                    delete oHistory.tmp;
                    oView.showHistory(oHistory);
                });
            this.$diviser = $('#diviserBtn')
                .on('click', function() {
                    var val = +self.$nbCarte.val();
                    // var algo = self.$algoSelector.val();
                    var oCommande = self._serializeForm();
                    oCommande = new bar.Commande(oCommande);
                    oView.showFacture(oCommande, val);
                });
            this.$login = $('#loginBtn')
                .on('click', function() {
                    var $modalContent = $('<div class="col s12">');
                    if (bar.store.login) {
                        $('<form class="col s12 active"><div class="row">' +
                            '<div class="input-field col s6"><input id="m-label" name="label" value="'+ bar.store.login.label +'" type="text"><label for="m-label" class="active">Label</label></div>' +
                            '<div class="input-field col s6"><input id="m-password" name="password" value="" type="password"><label for="m-password">Password (vide = pas de modification)</label></div>' +
                            '<input class="hide" type="submit" />' +
                            '</div></form>')
                            .on('submit', function (e) {
                                e.preventDefault();
                                var data = $(this).serializeObject();
                                data.id = bar.store.login.id;
                                Materializer.ajax({
                                    url: bar.config.API_URL + 'user',
                                    method: 'POST',
                                    data: JSON.stringify(data),
                                    contentType: 'application/json'
                                })
                                    .done(function (data) {
                                        $.extend(bar.store.login,data);
                                        Materialize.toast('Votre profil à été mis à jour', 2000);
                                        self.oView.makeUserAddons();
                                        $modal.modal('close');
                                    });
                            })
                            .appendTo($modalContent);
                    } else {
                        var $tabsWrapper = $('<ul class="tabs tabs-fixed-width">').appendTo($modalContent);

                        // Login
                        $('<li class="tab col s3"><a href="#log">Login</a></li>').appendTo($tabsWrapper);
                        $('<form id="log" class="col s12"><div class="row">' +
                            '<div class="input-field col s6"><input id="l-username" name="username" type="text"><label for="l-username">Login</label></div>' +
                            '<div class="input-field col s6"><input id="l-password" name="password" type="password"><label for="l-password">Password</label></div>' +
                            '<input class="hide" type="submit" />' +
                            '</div></form>')
                            .on('submit', function (e) {
                                e.preventDefault();
                                var data = $(this).serializeArray();
                                Materializer.ajax({
                                    url: bar.config.API_URL + 'login',
                                    method: 'POST',
                                    data: data
                                })
                                    .done(function (data) {
                                        bar.store.login = bar.store.users[data.id];
                                        Materialize.toast('Bonjour ' + data.label, 2000);
                                        $modal.modal('close');
                                    });
                            })
                            .appendTo($modalContent);

                        // Register
                        $('<li class="tab col s3"><a href="#register">S\'enregistrer</a></li>').appendTo($tabsWrapper);
                        $('<form id="register" class="col s12"><div class="row">' +
                            '<div class="input-field col s6"><input id="r-username" name="username" type="text"><label for="r-username">Login</label></div>' +
                            '<div class="input-field col s6"><input id="r-password" name="password"  type="password"><label for="r-password">Password</label></div>' +
                            '<input class="hide" type="submit" />' +
                            '</div></form>')
                            .on('submit', function (e) {
                                e.preventDefault();
                                var data = $(this).serializeObject();
                                Materializer.ajax({
                                    url: bar.config.API_URL + 'user',
                                    method: 'POST',
                                    data: JSON.stringify(data),
                                    contentType: 'application/json'
                                })
                                    .done(function (data) {
                                        bar.store.users[data.id] = bar.store.login = data;
                                        Materialize.toast('Bienvenue ' + data.label, 2000);
                                        self.oView.makeUserAddons();
                                        $modal.modal('close');
                                    });
                            })
                            .appendTo($modalContent);
                    }
                    var $modal = Materializer.createModal({
                        content: $modalContent,
                        type: 'bottom-sheet with-tabs',
                        footer: {
                            "Ok" : {
                                callback: function($m, $b) {
                                    $b.on('click', function() {
                                        $m.find('form.active').trigger('submit');
                                    });
                                }
                            }
                        }
                    });
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
                    self.$login.removeClass('scale-out').addClass('scale-in');

                    bar.helper.storage.export({'tmp': null });
                } else {
                    self.$diviser.removeClass('scale-out').addClass('scale-in');
                    self.$reset.removeClass('scale-out').addClass('scale-in');

                    self.$restore.removeClass('scale-in').addClass('scale-out');
                    self.$login.removeClass('scale-in').addClass('scale-out');

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
                                bar.store.login = bar.store.users[data.id];
                                Materialize.toast('Bonjour '+ data.label, 2000);
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