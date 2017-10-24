(function ($, O2) {
    /**
     * @property bar.Ctrl
     */
    O2.createClass('bar.Ctrl', {
        $nbCarte : null,
        $diviser : null,
        $reset: null,
        $login: null,
        $glass: null,
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
                        // Modify
                        $('<form class="col s12 active"><div class="row">' +
                            '<div class="col s12"><a class="btn-floating waves-effect waves-light red right" id="logoutBtn"><i class="material-icons">&#xE2C1;</i></a></div>' +
                            '<div class="input-field col s6"><input id="m-username" name="username" value="'+ bar.store.login.username +'" type="text"><label for="m-username" class="active">Username</label></div>' +
                            '<div class="input-field col s6"><input id="m-password" name="password" value="" type="password"><label for="m-password">Password (vide = pas de modification)</label></div>' +
                            '<div class="input-field col s6"><input id="m-label" name="label" value="'+ bar.store.login.label +'" type="text"><label for="m-label" class="active">Label</label></div>' +
                            '<div class="input-field col s6"><input id="m-password2" value="" type="password"><label for="m-password2">Confirmez password</label></div>' +
                            '<input class="hide" type="submit" />' +
                            '</div></form>')
                            .on('submit', function (e) {
                                e.preventDefault();
                                var $this = $(this);
                                var data = $this.serializeObject();
                                if ($this.find("#m-password2").val() !== data.password) {
                                    Materialize.toast('Les mots de passe ne sont pas identique',2000);
                                    return;
                                }
                                data.id = bar.store.login.id;
                                if (!data.password) {
                                    delete data.password;
                                }
                                self.flushProfile(data)
                                    .done(function () {
                                        Materialize.toast('Votre profil à été mis à jour', 2000);
                                        self.oView.makeUserAddons();
                                        $modal.modal('close');
                                    });
                            })
                            .appendTo($modalContent)
                            .find('#logoutBtn')
                                .on('click', function() {
                                    Materializer.ajax(bar.config.API_URL + 'logout')
                                        .done(function () {
                                            bar.store.login = null;
                                            Materialize.toast('Vous êtes déconnecté', 2000);
                                            $modal.modal('close');
                                        });
                                });
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
                                if (data.username) {
                                    data.label = data.username;
                                }
                                self.flushProfile(data)
                                    .done(function (data) {
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
            var favTimeout = null;
            this.$contentWrapper.on('change', function() {
                var oForm = self._serializeForm();
                if (oForm.cmd) {
                    oForm.cmd = oForm.cmd.filter(bar.helper.filter.empty);
                    if (!oForm.cmd.length) {
                        delete oForm.cmd;
                    }
                }
                var fav = [];
                if (oForm.fav) {
                    fav = oForm.fav;
                    delete oForm.fav;
                }
                if (bar.store.login) {
                    if (favTimeout) {
                        clearTimeout(favTimeout);
                    }
                    favTimeout = setTimeout(function () {
                        if (JSON.stringify(bar.store.login.pref) !== JSON.stringify(fav.map(function (v) { return +v; }))) {
                            self.flushProfile({
                                id: bar.store.login.id,
                                pref: fav.map(function (v) {
                                    return {"id": v};
                                })
                            }).done(function () {
                                Materialize.toast('Vos favoris ont été persistés', 2000);
                                self.oView.makeUserAddons();
                            });
                        }
                    }, 2000);
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
                                bar.store.login = bar.store.users[data.id];
                                $.extend(bar.store.login, data);
                                Materialize.toast('Bonjour '+ data.label, 2000);
                            }
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
                                    var tot = $cBody.find('input[type="number"]').serializeArray().reduce(function(a, v) {
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
                });
            this.$glass = $('#glass').one('click', function() {
                self.easterEgg();
            });
        },
        flushProfile: function(data) {
            if ($.isPlainObject(data)) {
                var url;
                if (data.id) {
                    url = bar.config.API_URL + 'user';
                } else {
                    url = bar.config.API_URL + 'register';
                }
                return Materializer.ajax({
                    url: url,
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                })
                    .done(function (data) {
                        var target = bar.store.users[data.id];
                        if (target) {
                            $.extend(target, data);
                        } else {
                            bar.store.users[data.id] = bar.store.login = data;
                        }
                    });
            }
            return null;
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
        },
        easterEgg: function() {
            var self = this;
            var $glass = this.$glass;
            var gameOver = false;
            var start = null;
            var alpha = 0;
            var facteurAcceleration = 1;
            var cssLeft = $glass.css('left');
            var left = $glass.offset().left;
            var borneMin = -250;
            var borneMax = window.innerWidth;
            window.addEventListener('devicemotion', function(e) {
                alpha = - e.accelerationIncludingGravity.x * facteurAcceleration;
            });

            function moveGlass(timestamp) {
                if (start === null) start = timestamp;
                if (left < borneMin || borneMax < left) {
                    gameOver = true;
                }
                if (timestamp - start >= facteurAcceleration * 5000) {
                    facteurAcceleration++;
                }
                if (!gameOver) {
                    left = left + Math.round(alpha);
                    $glass.css('left', left);
                    requestAnimationFrame(moveGlass);
                } else {
                    Materialize.toast('Score : '+ parseInt(timestamp - start) / 1000 +'s', 2000);
                    start = null;
                    left = $glass.css('left', cssLeft).offset().left;
                    gameOver = false;
                    facteurAcceleration = 1;
                    $glass.one('click', function() {
                        requestAnimationFrame(moveGlass);
                    })
                }
            }
            requestAnimationFrame(moveGlass);
        }
    });
})(jQuery, O2);