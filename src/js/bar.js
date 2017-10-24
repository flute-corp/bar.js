(function (O2) {
    /**
     * @property bar.store.articles
     */
    O2.createObject('bar.store.articles', {
        1: {
            "id": 1,
            "cat": 0,
            "label": "Coca-cola",
            "desc": "Attention aux bulles !",
            "prix": 1,
            "img": "coca.jpg"
        },
        2: {
            "id": 2,
            "cat": 0,
            "label": "Coca zero",
            "desc": "Les bulles sont sans sucre !",
            "prix": 1,
            "img": "coca-zero.jpg"
        },
        3: {
            "id": 3,
            "cat": 0,
            "label": "Jus d'orange",
            "desc": "Quand c'est trop c'est tropico.",
            "prix": 1,
            "img": "jus-orange.jpg"
        },
        4: {
            "id": 4,
            "cat": 0,
            "label": "Jus de pomme",
            "desc": "C'est trognon comme boisson.",
            "prix": 1,
            "img": "jus-pomme.jpg"
        },
        5: {
            "id": 5,
            "cat": 0,
            "label": "Jus d'abricot",
            "desc": "Sans noyau.",
            "prix": 1,
            "img": "jus-abricot.jpg"
        },
        6: {
            "id": 6,
            "cat": 0,
            "label": "Jus d'ananas",
            "desc": "Les ananas de la belle...",
            "prix": 1,
            "img": "jus-ananas.jpg"
        },
        7: {
            "id": 7,
            "cat": 0,
            "label": "Jus de pamplemousse",
            "desc": "Meilleur avec du vin blanc.",
            "prix": 1,
            "img": "jus-pamplemousse.jpg"
        },
        8: {
            "id": 8,
            "cat": 0,
            "label": "Jus de tomate",
            "desc": "La tomate est un fruit, c'est un fait.",
            "prix": 1,
            "img": "jus-tomate.jpg"
        },
        9: {
            "id": 9,
            "cat": 0,
            "label": "Jus de fraise",
            "desc": "La boisson de charlotte.",
            "prix": 1,
            "img": "jus-fraise.jpg"
        },
        10: {
            "id": 10,
            "cat": 0,
            "label": "Orangina",
            "desc": "Secouez, sinon la pulpe, elle reste en bas.",
            "prix": 1,
            "img": "orangina.jpg"
        },
        11: {
            "id": 11,
            "cat": 0,
            "label": "Schweppes agrum",
            "desc": "What did you expect.",
            "prix": 1,
            "img": "schweppes-agrum.jpg"
        },
        12: {
            "id": 12,
            "cat": 0,
            "label": "Limonade",
            "desc": "Bulle + citron + eau.",
            "prix": 1,
            "img": "limonade.jpg"
        },
        13: {
            "id": 13,
            "cat": 0,
            "label": "Perrier",
            "desc": "Un sirop dedans ?",
            "prix": 1,
            "img": "perrier.jpg"
        },
        14: {
            "id": 14,
            "cat": 0,
            "label": "Evian",
            "desc": "(De quel massif montagneux ca vient çà déjà ?)",
            "prix": 1,
            "img": "evian.jpg"
        },
        15: {
            "id": 15,
            "cat": 0,
            "label": "Cristaline",
            "desc": "C'est clair",
            "prix": 0.5,
            "img": "cristaline.jpg"
        },
        16: {
            "id": 16,
            "cat": 0,
            "label": "la Seinoise",
            "desc": "Riche en urinium, et en oligo-excréments.",
            "prix": 0.5,
            "img": "seinoise.jpg"
        },
        17: {
            "id": 17,
            "cat": 1,
            "label": "Grim (bouteille)",
            "desc": "La bière des hommes",
            "prix": 1.5,
            "img": "grimbergen.jpg"
        },
        18: {
            "id": 18,
            "cat": 1,
            "label": "Grim Rouge",
            "desc": "La bière des femmes",
            "prix": 1.5,
            "img": "grim-rouge.jpg"
        },
        19: {
            "id": 19,
            "cat": 1,
            "label": "1664",
            "desc": "Idéal avant de retourner sur le chantier",
            "prix": 1.3,
            "img": "1664-pression.jpg"
        },
        20: {
            "id": 20,
            "cat": 1,
            "label": "1664 (bouteille)",
            "desc": "Idéal avant de retourner sur le chantier",
            "prix": 1.5,
            "img": "1664.jpg"
        },
        21: {
            "id": 21,
            "cat": 1,
            "label": "Panaché",
            "desc": "Servi avec panache !",
            "prix": 1.3,
            "img": "panache.jpg"
        },
        22: {
            "id": 22,
            "cat": 1,
            "label": "Monaco",
            "desc": "Une peu de fruit pour les vitamines !",
            "prix": 1.3,
            "img": "monaco.jpg"
        },
        23: {
            "id": 23,
            "cat": 1,
            "label": "PCB",
            "desc": "Un picon ch'tit biloute !",
            "prix": 1.8,
            "img": "picon.jpg"
        },
        24: {
            "id": 24,
            "cat": 1,
            "label": "Bière du mois",
            "desc": "Selon arrivages",
            "prix": 1.5,
            "img": "bdm.jpg"
        },
        25: {
            "id": 25,
            "cat": 2,
            "label": "Martini",
            "desc": "Martini dry... Avec ou sans olives ?",
            "prix": 1.5,
            "img": "martini.jpg"
        },
        26: {
            "id": 26,
            "cat": 2,
            "label": "Muscat",
            "desc": "Une velle robe dorée",
            "prix": 1.5,
            "img": "muscat.jpg"
        },
        27: {
            "id": 27, "cat": 2, "label": "Pineau", "desc": "À commander en charentaises", "prix": 1.5
        },
        28: {
            "id": 28,
            "cat": 2,
            "label": "Rosé pamplemousse",
            "desc": "Teneur en fruit non garantie",
            "prix": 1.4
        },
        29: {
            "id": 29, "cat": 2, "label": "Vin blanc", "desc": "Belle robe dorée", "prix": 1.4
        },
        30: {
            "id": 30,
            "cat": 2,
            "label": "Vin mousseux",
            "desc": "Le vin qui pique !",
            "prix": 1.4
        },
        31: {
            "id": 31, "cat": 2, "label": "Cidre (75cl)", "desc": "Mangez des pommes !", "prix": 5
        },
        32: {
            "id": 32,
            "cat": 2,
            "label": "Kir vin blanc",
            "prix": 1.5
        },
        33: {
            "id": 33, "cat": 2, "label": "Kir royal", "desc": "Mure ou cassis ?", "prix": 1.5
        },
        34: {
            "id": 34,
            "cat": 3,
            "label": "Chips",
            "desc": "Le roi de la pomme de terre",
            "prix": 2,
            "img": "chips.jpg"
        },
        35: {
            "id": 35,
            "cat": 3,
            "label": "Saucisson",
            "desc": "Préciser \"A l'ail\" si possible",
            "prix": 2.9,
            "img": "saucisson.jpg"
        },
        36: {
            "id": 36, "cat": 3, "label": "Chorizo", "desc": "Aux épices", "prix": 2.9
        },
        37: {
            "id": 37,
            "cat": 3,
            "label": "Olives",
            "desc": "Fraichement cueillies dans le bocal",
            "prix": 2
        },
        38: {
            "id": 38,
            "cat": 3,
            "label": "Carre filet",
            "desc": "Aucune idée mais c'est sur la carte....",
            "prix": 3.5
        },
        39: {
            "id": 39,
            "cat": 4,
            "label": "Espresso",
            "desc": "Du bon nectar.",
            "prix": 0.5,
            "img": "espresso.jpg"
        },
        40: {
            "id": 40,
            "cat": 4,
            "label": "Double Espresso",
            "desc": "Que j'aime ta couleur...",
            "prix": 1,
            "img": "doubleEspresso.jpg"
        },
        41: {
            "id": 41,
            "cat": 4,
            "label": "Décaféiné",
            "desc": "C'est pas du café en gros ?",
            "prix": 0.5,
            "img": "decafeine.jpg"
        },
        42: {
            "id": 42,
            "cat": 4,
            "label": "Chocolat",
            "desc": "Le meilleurs c'est choky !",
            "prix": 0.5,
            "img": "chocolat.jpg"
        },
        43: {
            "id": 43,
            "cat": 4,
            "label": "Capuccino",
            "desc": "À l'italienne",
            "prix": 0.5,
            "img": "capuccino.jpg"
        },
        44: {
            "id": 44,
            "cat": 4,
            "label": "Thé",
            "desc": "Tea time",
            "prix": 0.5,
            "img": "the.jpg"
        }
    });
})(O2);;(function (O2) {
    /**
     * @property bar.store.categories
     */
    O2.createObject('bar.store.categories', {
        1: {
            "label": "Soft",
            "icon": "&#xEB41;"
        },
        2: {
            "label": "Binouzes",
            "icon": "&#xE544;"
        },
        3: {
            "label": "Boissons alcoolisées",
            "icon": "&#xE540;"
        },
        4: {
            "label": "Miam-miam",
            "icon": "&#xE552;"
        },
        5: {
            "label": "Boissons Chaudes",
            "icon": "&#xE541;"
        }
    });
})(O2);;(function (O2) {
    /**
     * @property bar.store.users
     */
    O2.createObject('bar.store.users', {
        1: {label: 'Daedalus', pref: [17]},
        2: {label: 'Neo', pref: [17, 1, 9]},
        3: {label: 'Priguns', pref: [17, 1]},
        4: {label: 'Reebox', pref: [2]},
        5: {label: 'Ralphy', pref: [17, 1]},
        6: {label: 'Briscoto', pref: [17, 1]},
        7: {label: 'Alex', pref: [17, 1]},
        8: {label: 'Max', pref: [12]},
        9: {label: 'Sam', pref: [17, 1]},
        10: {label: 'Loïc', pref: [17, 1]},
        11: {label: 'Damien', pref: [17, 1]},
        12: {label: 'Laurent F.', pref: [17, 1]},
        13: {label: 'Rémi F.', pref: [17, 1]}
    });
})(O2);
;(function ($, O2) {
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
})(jQuery, O2);;(function ($, O2) {
    /**
     * @property bar.Commande
     */
    O2.createClass('bar.Commande', {
        id : null,
        _commande : null,
        _oCommande : null,
        prix: 0,
        __construct : function(oCommande) {
            var self = this;
            this._commande = {};
            this._oCommande = {};
            // for (var i = 0; i < bar.store.articles.length; i++) {
            //     this._commande[i] = 0;
            // }
            if (typeof oCommande !== 'undefined' && $.isPlainObject(oCommande)) {
                this._oCommande = oCommande;
                if (oCommande.cmd) {
                    $.each(oCommande.cmd, function(i, v) {
                        var val = +v;
                        if (val) {
                            self.add(i, v);
                        }
                    });
                }
                if (oCommande.user) {
                    oCommande.user.forEach(function(v) {
                        self.add(v, 1);
                    })
                }
            }
        },
        add : function(idArticle, qt) {
            if (this._commande[idArticle]) {
                this._commande[idArticle] += qt;
            } else {
                this._commande[idArticle] = qt;
            }
            this.prix += bar.store.articles[idArticle].prix * qt;
            return this;
        },
        getCommande : function() {
            return $.map(this._commande, function(v, i) {
                if (bar.store.articles[i]) {
                    var art = $.extend({}, bar.store.articles[i]);
                    art['qt'] = v;
                    return art;
                }
                return null;
            });
        },
        getPrix : function() {
            return Math.round((this.prix*100)) / 100;
            // var prix = 0;
            // if (this._commande.length !== 0) {
            //     prix = this._commande.reduce(function(a, b, i) {
            //         if (b) {
            //             a += bar.store.articles[i]['prix'] * b;
            //         }
            //         return a;
            //     }, prix);
            // }
            // return Math.round((prix*100)) / 100;
        },
        toLocalStorage : function () {
            var date = new Date().toJSON();
            var oJson = {};
            oJson[date] = this._oCommande;
            bar.helper.storage.export(oJson);
        },
        _initDivision : function(nbCarte) {
            if (typeof nbCarte === 'undefined') {
                throw 'Un nombre de carte est requis';
            }
            var _aCommandes = [], c;
            for (var i = 0; i < nbCarte; i++) {
                c = new bar.Commande();
                c.id = i;
                _aCommandes.push(c);
            }
            return _aCommandes;
        },
        _tokenRing : function(aCommande, _aCommandes) {
            var token;
            aCommande.forEach(function(el) {
                if (el) {
                    for (var i = 0; i < el.qt; i++) {
                        token = _aCommandes.reduce(bar.helper.reduce.byKey('prix'));
                        token.add(el.id, 1);
                    }
                }
            });
            return _aCommandes;
        },

        /** Algo 1 :
         * 1 / Tri décroissant des articles par prix
         * 2 / Distribution récursive sur la carte la moins chargée
         */
        auPlusEquitable : function(nbCarte) {
            var _aCommandes = this._initDivision(nbCarte);
            // Calcul
            var aCommande = this.getCommande();
            // Tri par prix
            aCommande = aCommande.sort(bar.helper.sort.byKey('prix'));
            this._tokenRing(aCommande, _aCommandes);
            return _aCommandes;
        }
        /** Algo 2 :
         * 1/ Calcul du prix moyen après division sur les cartes
         * 2/ Répartition d'un groupe d'article sur une carte au plus proche de la moyenne
         * 3/ Répartition des articles restants
         */
        // auPlusSimple : function(nbCarte) {
        // 	var _aCommandes = this._initDivision(nbCarte);
        // 	// Calcul
        // 	var prix = this.getPrix();
        // 	var prixMoyen = prix / nbCarte;
        //
        // 	var aCommande = this.getCommande();
        // 	// Suppression des articles qt vide
        // 	aCommande = aCommande.filter(function(a) {
        // 		return +a.qt;
        // 	});
        // 	// Tri par quantité
        // 	aCommande = aCommande.sort(bar.helper.sort.byKey('qt'));
        // 	// Itérateur éternel d'array
        // 	function* arrayIterator(a) {
        // 		yield* a;
        // 	}
        // 	// Itérateur yoyo d'array
        // 	//function* yoyoIterator(a) {
        // 	//	yield* a;
        // 	//	if (!a.length) return;
        // 	//	yield* yoyoIterator(a.reverse());
        // 	//}
        // 	var itArticle = arrayIterator(aCommande);
        // 	//var itCommande = yoyoIterator(_aCommandes);
        // 	var token = _aCommandes.reduce(bar.helper.reduce.byMethod('getPrix'));
        // 	var i = 0;
        // 	for (var art = itArticle.next(); !art.done; art = itArticle.next()) {
        // 		while (art.value.qt) {
        // 			if ( (token.getPrix() + art.value.prix) > prixMoyen ) { // Si le prix est dépassé on break et on passe au suivant
        // 				break;
        // 			}
        // 			token.add(art.value.id, 1);
        // 			art.value.qt--;
        // 		}
        // 		token = _aCommandes.reduce(bar.helper.reduce.byMethod('getPrix')); // Bascule sur une commande moins chargée avant de poursuivre
        // 	}
        //
        // 	this._tokenRing(aCommande, _aCommandes);
        //
        // 	return _aCommandes;
        // }
    });
})(jQuery, O2);;(function ($, O2) {
    /**
     * @property bar.config
     */
    O2.createObject('bar.config', {
        STORAGE_KEY: 'bar',
        API_URL: (window.location.hostname === 'localhost' ? 'api/web/app_dev.php/' : 'api/web/')
    });
})(jQuery, O2);;(function ($, O2) {
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
            console.log('game started !');
            var self = this;
            var $glass = this.$glass;
            var gameOver = false;
            var start = null;
            var alpha = 0;
            var cssLeft = $glass.css('left');
            var left = $glass.offset().left;
            var borneMin = -250;
            var borneMax = window.innerWidth;
            window.addEventListener('deviceorientation', function(e) {
                var a = +e.alpha;
                if (a < 180) {
                    alpha = -a;
                } else {
                    alpha = 360 - a;
                }
            });

            function moveGlass(timestamp) {
                if (start === null) start = timestamp;
                if (left < borneMin || borneMax < left) {
                    gameOver = true;
                }
                if (!gameOver) {
                    left = left + alpha;
                    $glass.css('left', left);
                    requestAnimationFrame(moveGlass);
                } else {
                    Materialize.toast('Score : '+ parseInt(timestamp - start) / 1000 +'s', 2000);
                    start = null;
                    left = $glass.css('left', cssLeft).offset().left;
                    gameOver = false;
                    $glass.one('click', function() {
                        requestAnimationFrame(moveGlass);
                    })
                }
            }
            requestAnimationFrame(moveGlass);
        }
    });
})(jQuery, O2);;(function ($, O2) {
    /**
     * @property bar.helper
     */
    O2.createObject('bar.helper', {
        "pluralize": function(el) {
            if (Array.isArray(el)) {
                return el.length > 1 ? 's' : '';
            }
            if (typeof el === 'string') {
                return el +"s";
            }
            return +el > 1 ? 's' : '';
        },
        "delete": {
            "null": function (v, i, a) {
                if (v === null) {
                    delete a[i];
                }
            },
            "zero": function (v, i, a) {
                if (v === null || v === undefined) {
                    return;
                }
                if (v.toString() === '0') {
                    delete a[i];
                }
            },
            "empty": function (v, i, a) {
                if (!+v) {
                    delete a[i];
                }
            }
        },
        "filter": {
            "null" : function (v) {
                return v !== null;
            },
            "zero" : function (v) {
                return v.toString() !== '0';
            },
            "empty" : function (v) {
                return +v;
            }
        },
        "sort": {
            byKey : function(k) {
                return function(a, b) {
                    if (a[k] > b[k])
                        return -1;
                    if (a[k] < b[k])
                        return 1;
                    // a doit être égal à b
                    return 0;
                }
            }
        },
        "reduce": {
            byMethod : function(mth) {
                return function(a, b) {
                    return a[mth]() <= b[mth]() ? a : b;
                }
            },
            byKey : function(k) {
                return function(a, b) {
                    return a[k] <= b[k] ? a : b;
                }
            }
        },
        "storage": {
            '_getStorage' : function () {
                var storage = localStorage.getItem(bar.config.STORAGE_KEY);
                return storage ? JSON.parse(storage) : {};
            },
            '_setStorage' : function (o) {
                localStorage.setItem(bar.config.STORAGE_KEY, JSON.stringify(o));
            },
            'import': function() {
                var oJson = this._getStorage();
                var oCur;
                if (oJson) {
                    for (var date in oJson) {
                        if (oJson.hasOwnProperty(date) && oJson.date) {
                            oCur = oJson[date];
                            if (oCur.hasOwnProperty('user')) {
                                oCur.user.forEach(bar.helper.delete.null);
                            }
                            if (oCur.hasOwnProperty('cmd')) {
                                oCur.cmd.forEach(bar.helper.delete.empty);
                            }
                        }
                    }
                }
                return oJson;
            },
            'export': function(oData) {
                var oStorage = this._getStorage();
                $.extend(true, oStorage, oData);
                for (var k in oStorage) {
                    if (!oStorage[k]) {
                        delete oStorage[k];
                    }
                }
                this._setStorage(oStorage);
            }
        }
    });
})(jQuery, O2);;(function ($, O2) {
    /**
     * @property bar.View
     */
    O2.createClass('bar.View', {
        $contentWrapper : null,
        __construct : function() {
            this.$contentWrapper = $('#contentWrapper');
        },
        showHome : function() {
            var $aCat = {};
            var $accordion = $('<ul class="collapsible" data-collapsible="expandable">')
                .appendTo($('<div class="col s12">').appendTo(this.$contentWrapper));
            $.each(bar.store.categories, function(i, oCat) {
                var $el = $('<div class="collapsible-body row">');
                $aCat[oCat.id] = $el;
                $('<li><div class="collapsible-header"><span class="badge"></span><i class="material-icons">'+ oCat.icon +'</i>'+ oCat.label +'</div></li>')
                    .appendTo($accordion)
                    .append($el);
            });
            $.each(bar.store.articles, function(i, oArt) {
                $('<div class="col s6 m3 artCard">' +
                    '<div class="card">' +
                        '<div class="card-image">' +
                            '<img class="activator" src="src/img/'+ oArt.id +'.jpg">' +
                            '<div class="floatingArea">' +
                                '<a class="btn-floating waves-effect waves-light orange"><i class="material-icons">&#xE15B;</i></a>' +
                                '<input type="number" name="cmd['+ oArt.id +']" min="0" value="0"/>' +
                                '<a class="btn-floating waves-effect waves-light blue add"><i class="material-icons">&#xE145;</i></a>' +
                            '</div>' +
                            '<div class="starswitch"><label class="btn-floating waves-effect white"><input type="checkbox" '+ (bar.store.login && bar.store.login.pref.indexOf(oArt.id) !== -1 ? 'checked="checked"': '') +' name="fav[]" value="'+ oArt.id +'"><i class="material-icons blue-text star">&#xE838;</i><i class="material-icons black-text">&#xE83A;</i></label></div>' +
                        '</div>' +
                        '<div class="card-content not-too-large">' +
                            '<span class="card-title activator black-text truncate">'+ oArt.label +'</span>' +
                            '<p>'+ oArt.prix +'€<i class="material-icons activator right">more_vert</i></p>' +
                        '</div>' +
                        '<div class="card-reveal">' +
                            '<span class="card-title grey-text text-darken-4">'+ oArt.label +'<i class="material-icons right">close</i></span>' +
                            '<p>'+ (oArt.desc || 'Aucune description') +'</p>' +
                        '</div>' +
                    '</div>' +
                    '</div>')
                    .appendTo($aCat[oArt.cat]);

            });
            this.$contentWrapper
                .find('.floatingArea .btn-floating')
                .on('click', function() {
                    var $this = $(this);
                    var $input = $this.siblings('input');
                    if ($this.hasClass('add')) {
                        $input.val(+$input.val() + 1);
                    } else {
                        var val = +$input.val() - 1;
                        if (val >= 0) {
                            $input.val(+$input.val() - 1);
                        }
                    }
                    $input.trigger('change');
                });
            this.$contentWrapper
                .find('.starswitch input')
                .on('change', function() {
                    var $this = $(this);
                    if (this.checked) {
                        $(this).attr('checked','checked');
                    } else {
                        $(this).attr('checked',null);
                    }
                });
            $accordion.collapsible();
        },
        makeUserAddons : function() {
            var oldVal = null;
            if ($.isPlainObject(bar.store.users)) {
                if (this.$userAddons) {
                    var oUser = this.$contentWrapper.serializeObject()['user'];
                    if (oUser) {
                        oldVal = {user: this.$contentWrapper.serializeObject()['user']};
                    }
                    this.$userAddons.remove();
                }
                var $wrapper = this.$userAddons = $('<div class="input-field col s12">');
                $('<i class="material-icons prefix">&#xE8EF;</i>').appendTo($wrapper);
                var $input = $('<input data-target="quickBillModal" class="" readonly="true" data-activates="select-user-pref" value="Choisissez des participants..." type="text" />').appendTo($wrapper);
                var $modalWrapper = $('<div id="quickBillModal" class="modal bottom-sheet">').appendTo($wrapper);
                var $modalContent = $('<div class="modal-content">').appendTo($modalWrapper);
                var $ul = $('<ul class="modal-list">').appendTo($modalContent);
                var $li = $();
                $.each(bar.store.users, function(idUser, oUser) {
                    $('<li class="optgroup"><span>'+ (oUser.label || '???') +'</span></li>').appendTo($ul)
                    if (Array.isArray(oUser.pref)) {
                        oUser.pref.forEach(function(pref) {
                            if (bar.store.articles[pref]) {
                                $li.push($('<li class="optgroup-option"><span><input type="checkbox" name="user['+ idUser +']" value="'+ pref +'"><label></label>'+ bar.store.articles[pref].label +'</span></li>').appendTo($ul)[0]);
                            }
                        });
                    }
                });
                $wrapper.append('<label class="active">QuickBill</label>');
                $li.on('click', function(e) {
                    var $this = $(this);
                    e.stopPropagation();
                    e.preventDefault();
                    if ($this.is('.optgroup-option:not(.disabled)')) {
                        var $checkbox = $this.find('input[type="checkbox"]');
                        var checked = $checkbox.prop('checked', function (i, v) {
                            return !v;
                        });
                        $checkbox.trigger('change');
                    } else if ($this.is('.optgroup-option.disabled')) {
                        $input.dropdown('close');
                    }
                })
                    .find('input[type="checkbox"]')
                    .on('change', function() {
                        var articles = {};
                        var $this = $(this);
                        var $parent = $this.closest('li');
                        if ($this.prop('checked')) {
                            $parent.addClass('active');
                            var $el = $()
                                .add($parent.prevUntil('.optgroup', '.active'))
                                .add($parent.nextUntil('.optgroup', '.active'));
                            $el.trigger('click');
                        } else {
                            $parent.removeClass('active');
                        }
                        $li.filter('.active').each(function() {
                            var text = $(this).text();
                            articles[text] = articles[text] ? articles[text] + 1 : 1;
                        });

                        var value = '';
                        for (var v in articles) {
                            if (value) value += ', ';
                            value += articles[v]+' '+v;
                        }
                        $input.val(value || "Choisissez des participants...");
                    });
                this.$contentWrapper.on('reset', function() {
                    $li.removeClass('active');
                });
                $wrapper.prependTo(this.$contentWrapper);
                $input
                    .on('click', function() {
                        window.location.hash = 'quickBill';
                    });
                $modalWrapper.modal();

                $(window).on('hashchange', function() {
                    if ($modalWrapper.hasClass('open') && window.location.hash !== '#quickBill') {
                        $modalWrapper.modal('close');
                    }
                });
                if (oldVal) {
                    this.$contentWrapper.deserializeObject(oldVal);
                }
            }
        },
        _get$tab : function(title, oCommande) {
            var oTab = {
                $tab : null,
                $content : null
            };
            oTab.$tab = $('<li class="tab col s3"><a href="#'+ title +'">'+ title +'</a></li>');
            oTab.$content = $('<div id="'+ title +'" class="col s12">');
            oTab.$content.append('<h3>Total :'+ oCommande.getPrix() +'€<h3>');
            var $table = $('<table class="striped bordered highlight">').appendTo(oTab.$content);
            $table.append('<tr><th>Article</th><th>Quantité</th><th>Prix</th></tr>');
            oCommande.getCommande().forEach(function(c) {
                if (c && c.qt) {
                    $table.append('<tr><td>'+ c.label +'</td><td>'+ c.qt +'</td><td>'+ Math.round((c.qt * c.prix) * 100) / 100 +'€</td></tr>');
                }
            });
            return oTab;
        },
        _getAll$tab : function(oCommande, nbCarte, algo) {
            var self = this;
            var aTab = [];
            aTab.push(this._get$tab("S", oCommande));
            if (nbCarte > 1) {
                oCommande[algo](nbCarte).forEach(function (subCommande) {
                    aTab.push(self._get$tab((subCommande.id + 1), subCommande));
                });
            }
            return aTab;
        },
        showFacture : function(oCommande, nbCarte, algo) {
            algo = algo || 'auPlusEquitable';
            var $modalContent = $('<div class="col s12 fixed-tabs-wrapper">');
            nbCarte = ~~nbCarte;
            if (!nbCarte) {
                Materialize.toast('Vous devez au moins avoir une carte', 2000);
                return;
            }
            if (nbCarte < 0) {
                Materialize.toast('Le bar ne fait pas crédit !', 2000);
                return;
            }
            if (oCommande.getPrix() !== 0) {
                var $tabsWrapper = $('<ul class="tabs tabs-fixed-width">').appendTo($modalContent);

                var all$tab = this._getAll$tab(oCommande, nbCarte, algo);

                all$tab.forEach(function(oTab) {
                    $tabsWrapper.append(oTab.$tab);
                    $modalContent.append(oTab.$content);
                });
            } else {
                Materialize.toast('Votre commande est vide', 2000);
                return;
            }
            Materializer.createModal({
                content : $modalContent,
                type : "modal-fixed-footer",
                footer: {
                    'Annuler' : {
                        'classe' : 'modal-close'
                    },
                    'Enregistrer et vider' : {
                        'callback' : function(modal, button) {
                            button.on('click', function() {
                                oCommande.toLocalStorage();
                                $('#reset').trigger('click');
                                modal.modal('close');
                            });
                        }
                    },
                    'Enregistrer' : {
                        'callback' : function(modal, button) {
                            button.on('click', function() {
                                oCommande.toLocalStorage();
                                modal.modal('close');
                            });
                        }
                    }
                }
            });
        },
        showHistory: function (oHistory) {
            if ($.isEmptyObject(oHistory)) {
                Materialize.toast("L'historique est vide", 2000);
                return;
            }
            var $modalContent = $('<div class="col s12 fixed-tabs-wrapper">');
            var $accordion = $('<ul class="collapsible" data-collapsible="expandable">')
                .appendTo($modalContent);
            for (var date in oHistory) {
                $accordion.prepend(this._get$accordion(date, oHistory[date]));
            }
            Materializer.createModal({
                content : $modalContent,
                type : "modal-fixed-footer",
                header: "Historique",
                footer: {
                    'Fermer' : {
                        'classe' : 'modal-close'
                    }
                }
            });
            $accordion.collapsible();
        },
        _get$accordion : function (date, oForm) {
            var self = this;
            var $body = $('<div class="collapsible-body col s12">');
            var sDate = new Date(date);
            sDate = sDate.toFrench();
            var headerText = sDate;
            if (oForm.user && oForm.user.length) {
                var filteredUser = oForm.user.filter(bar.helper.filter.null);
                if (filteredUser.length) {
                    headerText += ' - '+ filteredUser.length +' habitué'+ bar.helper.pluralize(filteredUser);
                    var $habitue = $('<table class="striped bordered highlight">').appendTo($body);
                    $habitue.append('<tr><th style="width: 50%;">Habitué</th><th>Boisson</th></tr>');
                    oForm.user.forEach(function(v, i) {
                        if (v !== null) {
                            $habitue.append('<tr><td>' + bar.store.users[i].label + '</td><td>' + bar.store.articles[v].label + '</td></tr>');
                        }
                    });
                }
            }
            if (oForm.cmd && oForm.cmd.length) {
                var filteredCmd = oForm.cmd.filter(bar.helper.filter.empty);
                if (filteredCmd.length) {
                    headerText += ' - ' + filteredCmd.length + ' complément' + bar.helper.pluralize(filteredCmd);
                    var $complement = $('<table class="striped bordered highlight">').appendTo($body);
                    $complement.append('<tr><th style="width: 50%;">Article</th><th>Quantité</th></tr>');
                    filteredCmd.forEach(function (v, i) {
                        if (bar.store.articles[i]) {
                            $complement.append('<tr><td>' + bar.store.articles[i].label + '</td><td>' + v + '</td></tr>');
                        }
                    });
                }
            }
            var $footer = $('<div class="right-align">').prependTo($body);
            // Supprimer
            $('<a class="btn btn-floating waves-effect waves-light btn red"><i class="material-icons right">&#xE92B;</i></a>')
                .appendTo($footer)
                .on('click', function() {
                    var $li = $(this).closest('li.active');
                    var $collapsible = $li.closest('.collapsible');
                    $collapsible.collapsible('close', $collapsible.find('li').index($li));
                    Vel(
                        $li,
                        {
                            "opacity": 0,
                            marginLeft: '-50%',
                            height: 0
                        },
                        {
                            duration: 375,
                            easing: 'easeOutExpo',
                            queue: false,
                            delay: 375,
                            complete: function() { $li.addClass('hide'); }
                        }
                    );
                    var json = {};
                    json[date] = null;
                    bar.helper.storage.export(json);
                });
            // Restaurer
            $('<a class="btn btn-floating waves-effect waves-light btn green"><i class="material-icons right">&#xE889;</i></a>')
                .appendTo($footer)
                .on('click', function() {
                    self.$contentWrapper.deserializeObject(oForm);
                    $(this).closest('.modal').modal('close');
                    Materialize.toast('Restauration terminée !', 2000);
                });
            return $('<li><div class="collapsible-header truncate"><i class="material-icons">&#xE889;</i>'+ headerText +'</div></li>')
                .append($body);
        }
    });
})(jQuery, O2);