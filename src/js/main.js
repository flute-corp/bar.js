(function($) {

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

	var idCat = 0, idArt = 0;
	var aCategories = [];
	var aArticles = [];
	var aUsers = [
		{name:'Daedalus', pref: [16]},
        {name:'Neo', pref: [16, 0, 8]},
        {name:'Priguns', pref: [16, 0]},
        {name:'Reebox', pref: [2]},
        {name:'Ralphy', pref: [16, 0]},
        {name:'Briscoto', pref: [16, 0]},
        {name:'Alex', pref: [16, 0]},
        {name:'Max', pref: [12]},
        {name:'Sam', pref: [16, 0]},
        {name:'Loïc', pref: [16, 0]},
        {name:'Damien', pref: [16, 0]},
        {name:'Laurent F.', pref: [16, 0]}
	];
	
    /**
	 * La base de donnée se trouve dans database.js
     */
	bar.database.forEach(function(c) {
		var oCat = {label: c.label, icon: c.icon};
		if (!Array.isArray(c.articles)) {
			alert('Erreur base de données : la liste d\'article de "' + oCat.label + '" n\'est pas vraiment de type Array.');
		}
		c.articles.forEach(function(a) {
			aArticles.push({
				id: idArt++,
				cat: idCat,
				label: a.label,
				desc: a.desc,
				prix: a.prix,
				img: a.img
			});
		});
		++idCat;
		aCategories.push(oCat);
    });

	O2.createObject('bar.helper', {
		"pluralize": function(el) {
            if (Array.isArray(el)) {
                return el.length > 1 ? 's' : '';
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
                if (v != '0') {
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
                return v != '0';
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
            }
		}
	});

	var STORAGE_KEY = 'bar';

	O2.createObject('bar.storage', {
		'_getStorage' : function () {
			var storage = localStorage.getItem(STORAGE_KEY);
			return storage ? JSON.parse(storage) : {};
		},
        '_setStorage' : function (o) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
        },
		'import': function() {
            var oJson = bar.storage._getStorage();
            var oCur;
            for (var date in oJson) {
            	oCur = oJson[date];
                if (oCur.user) {
                    oCur.user.forEach(bar.helper.delete.null);
                }
                if (oCur.cmd) {
                    oCur.cmd.forEach(bar.helper.delete.empty);
                }
            }
            return oJson;
        },
		'export': function(oData) {
			var oStorage = bar.storage._getStorage();
			$.extend(true, oStorage, oData);
            bar.storage._setStorage(oStorage);
		}
	});

	O2.createClass('bar.Commande', {
		id : null,
		_commande : null,
		_oCommande : null,
		__construct : function(oCommande) {
			var self = this;
			this._commande = [];
			this._oCommande = {};
			for (var i = 0; i < aArticles.length; i++) {
				this._commande[i] = 0;
			}
			if (typeof oCommande != 'undefined' && $.isPlainObject(oCommande)) {
                this._oCommande = oCommande;
                if (oCommande.cmd) {
					oCommande.cmd.forEach(function(v, i) {
                        self._commande[i] += +v;
                    });
				}
				if (oCommande.user) {
					oCommande.user.forEach(function(v) {
                        ++self._commande[v];
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
			return this;
		},
		getCommande : function() {
			var _aCommande = $.extend(true, [], aArticles);
			aCommande = this._commande.map(function(v, i) {
				_aCommande[i]['qt'] = v;
				return _aCommande[i];
			});
			return aCommande;
		},
		getPrix : function() {
			var prix = 0;
			if (this._commande.length != 0) {
				prix = this._commande.reduce(function(a, b, i) {
					if (b) {
						a += aArticles[i]['prix'] * b;
					}
					return a;
				});
			}
			return Math.round((prix*100)) / 100;
		},
		toLocalStorage : function () {
			var date = new Date().toJSON();
			var oJson = {};
			oJson[date] = this._oCommande;
			bar.storage.export(oJson);
		},
		_initDivision : function(nbCarte) {
			if (typeof nbCarte == 'undefined') {
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
			for (var el of aCommande) {
				if (el) {
					for (var i = 0; i < el.qt; i++) {
						token = _aCommandes.reduce(bar.helper.reduce.byMethod('getPrix'));
						token.add(el.id, 1);
					}
				}
			}
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
		},
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
	
	O2.createClass('bar.App', {
		__construct : function() {
			var oView = new bar.View();
			var oCtrl = new bar.Ctrl(oView);
		}
	});
	
	O2.createClass('bar.View', {
		$contentWrapper : null,
		__construct : function() {
			this.$contentWrapper = $('#contentWrapper');
			this.showHome();
		},
		showHome : function() {
			var $el, $aCat = [];
            this._makeUserAddons();
			var $accordion = $('<ul class="collapsible" data-collapsible="expandable">')
				.appendTo(this.$contentWrapper);
			for (var oCat of aCategories) {
				$el = $('<div class="collapsible-body col s12">');
				$aCat.push($el);
				$('<li><div class="collapsible-header"><i class="material-icons">'+ oCat.icon +'</i>'+ oCat.label +'</div></li>')
					.appendTo($accordion)
					.append($el);
			}
			for (var oArt of aArticles) {
				$el = $('<div class="col s6 m3 artCard">' +
                        '<div class="card">' +
                            '<div class="card-image">' +
                                '<img class="activator" src="src/img/'+ ( oArt.img || '404.jpg') +'">' +
                                '<div class="floatingArea">' +
                                    '<a class="btn-floating waves-effect waves-light orange"><i class="material-icons">&#xE15B;</i></a>' +
                                    '<input type="number" name="cmd['+ oArt.id +']" min="0" value="0"/>' +
                                    '<a class="btn-floating waves-effect waves-light blue add"><i class="material-icons">&#xE145;</i></a>' +
                                '</div>' +
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
			}
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
                        $this.trigger('change');
                    });
			$accordion.collapsible();
		},
        _makeUserAddons : function() {
            if (aUsers.length) {
                var $wrapper = $('<div class="input-field col s12">');
                var $select = $('<div class="select-wrapper">').appendTo($wrapper).append('<span class="caret">▼</span>')
                var $input = $('<input class="select-dropdown" readonly="true" data-activates="select-user-pref" value="Choisissez des participants..." type="text" />').appendTo($select);
                var $ul = $('<ul id="select-user-pref" class="dropdown-content select-dropdown multiple-select-dropdown">').appendTo($select);
                $ul.append('<li class="optgroup-option disabled"><span><input type="checkbox" disabled><label></label>Choisissez des participants...</span></li>')
                aUsers.forEach(function(oUser, idUser) {
                    $('<li class="optgroup"><span>'+ (oUser.name || '???') +'</span></li>').appendTo($ul);
                    if (Array.isArray(oUser.pref)) {
                        oUser.pref.forEach(function(pref) {
                            if (aArticles[pref]) {
                                $('<li class="optgroup-option"><span><input type="checkbox" name="user['+ idUser +']" value="'+ pref +'"><label></label>'+ aArticles[pref].label +'</span></li>').appendTo($ul);
                            }
                        });
                    }
                });
                $wrapper.append('<label>QuickBill</label>')
                var $li = $ul.find('li')
                $li.on('click', function(e) {
						var $this = $(this);
						e.stopPropagation();
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
                            $this = $(this);
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
                                value += articles[v] == 1 ? v : articles[v]+' '+v;
                            }
                            $input.val(value || "Choisissez des participants...");
						});
                this.$contentWrapper.on('reset', function() {
                	$li.removeClass('active');
				});
                $wrapper.appendTo(this.$contentWrapper);
                $input.dropdown();
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
			for (var c of oCommande.getCommande()) {
				if (c && c.qt) {
					$table.append('<tr><td>'+ c.label +'</td><td>'+ c.qt +'</td><td>'+ Math.round((c.qt * c.prix) * 100) / 100 +'€</td></tr>');
				}
			}
			return oTab;
		},
		_getAll$tab : function(oCommande, nbCarte, algo) {
			var aTab = [];
			aTab.push(this._get$tab("S", oCommande));
			for (var subCommande of oCommande[algo](nbCarte)) {
				aTab.push(this._get$tab((subCommande.id + 1), subCommande));
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
			if (oCommande.getPrix() != 0) {
				var $tabsWrapper = $('<ul class="tabs tabs-fixed-width">').appendTo($modalContent);
				
				var all$tab = this._getAll$tab(oCommande, nbCarte, algo);
				
				for (var oTab of all$tab) {
					$tabsWrapper.append(oTab.$tab);
					$modalContent.append(oTab.$content);
				}
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
                $accordion.prepend(this._get$accordion(date, oHistory[date]))
			}
            Materializer.createModal({
                content : $modalContent,
                type : "modal-fixed-footer"
            });
            $accordion.collapsible();
		},
        _get$accordion : function (date, oForm) {
			var self = this;
			var $body = $('<div class="collapsible-body col s12">');
			var date = new Date(date);
			date = date.toFrench();
			var headerText = date;
			if (oForm.user && oForm.user.length) {
				var filteredUser = oForm.user.filter(bar.helper.filter.null);
				if (filteredUser.length) {
                    headerText += ' - '+ filteredUser.length +' habitué'+ bar.helper.pluralize(filteredUser);
                    var $habitue = $('<table class="striped bordered highlight">').appendTo($body);
                    $habitue.append('<tr><th style="width: 50%;">Habitué</th><th>Boisson</th></tr>')
                    oForm.user.forEach(function(v, i) {
                        $habitue.append('<tr><td>'+ aUsers[i].name +'</td><td>'+ aArticles[v].label +'</td></tr>')
                    });
				}
			}
			if (oForm.cmd && oForm.cmd.length) {
				var filteredCmd = oForm.cmd.filter(bar.helper.filter.empty);
				if (filteredCmd.length) {
                    headerText += ' - ' + filteredCmd.length + ' complément' + bar.helper.pluralize(filteredCmd);
                    var $complement = $('<table class="striped bordered highlight">').appendTo($body);
                    $complement.append('<tr><th style="width: 50%;">Article</th><th>Quantité</th></tr>')
                    oForm.cmd.forEach(function (v, i) {
                        $complement.append('<tr><td>' + aArticles[i].label + '</td><td>' + v + '</td></tr>')
                    });
                }
            }
            var $footer = $('<div class="right-align">').appendTo($body);
            $('<a class="waves-effect waves-light btn green">Restaurer <i class="material-icons right">&#xE889;</i></a>')
				.appendTo($footer)
				.on('click', function() {
                    self.$contentWrapper.deserializeObject(oForm);
                    $(this).closest('.modal').modal('close');
                    Materialize.toast('Restauration terminée !', 2000);
				});
			var $el = $('<li><div class="collapsible-header"><i class="material-icons">&#xE889;</i>'+ headerText +'</div></li>')
				.append($body);

			return $el;
		}
	});
	
	O2.createClass('bar.Ctrl', {
		$nbCarte : null,
		$diviser : null,
		$reset: null,
		// $algoSelector : null,
		oView : null,
		__construct : function(oView) {
			var self = this;
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
					var oHistory = bar.storage.import();
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
			$(document).on('click', 'input[type=number]', function(e) {
				this.select();
			});
			$('select').material_select();
			$('.splash').addClass('disappear');

			$('.help').on('click', function(e) {
				e.preventDefault();
                self.discover();
			});
			if (!localStorage.getItem('discovered')) {
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
            $('.tap-target').tapTarget('open');
            localStorage.setItem('discovered',1);
		}
	});
	
	$(function() {
		var app = new bar.App();
	});
	
})(jQuery);
