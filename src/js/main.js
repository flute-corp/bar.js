(function($) {
	var idCat = 0, idArt = 0;
	var aCategorie = [];
	var aArticles = [];

	
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
		aCategorie.push(oCat);
    });


	O2.createObject('bar.reduce', {
		byMethod : function(mth) {
			return function(a, b) {
				return a[mth]() <= b[mth]() ? a : b;
			}
		}
	});
	
	O2.createObject('bar.sort', {
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
	});
	
	O2.createClass('bar.Commande', {
		id : null,
		_commande : null,
		__construct : function(aCommande) {
			this._commande = [];
			for (var i = 0; i < aArticles.length; i++) {
				this._commande[i] = 0;
			}
			if (typeof aCommande != 'undefined') {
				this._commande = aCommande;
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
						token = _aCommandes.reduce(bar.reduce.byMethod('getPrix'));
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
			aCommande = aCommande.sort(bar.sort.byKey('prix'));
			this._tokenRing(aCommande, _aCommandes);
			return _aCommandes;
		},
		/** Algo 2 :
		 * 1/ Calcul du prix moyen après division sur les cartes
		 * 2/ Répartition d'un groupe d'article sur une carte au plus proche de la moyenne
		 * 3/ Répartition des articles restants
		 */
		auPlusSimple : function(nbCarte) {
			var _aCommandes = this._initDivision(nbCarte);
			// Calcul
			var prix = this.getPrix();
			var prixMoyen = prix / nbCarte;
			
			var aCommande = this.getCommande();
			// Suppression des articles qt vide
			aCommande = aCommande.filter(function(a) {
				return +a.qt;
			});
			// Tri par quantité
			aCommande = aCommande.sort(bar.sort.byKey('qt'));
			// Itérateur éternel d'array
			function* arrayIterator(a) {
				yield* a;
			}
			// Itérateur yoyo d'array
			//function* yoyoIterator(a) {
			//	yield* a;
			//	if (!a.length) return;
			//	yield* yoyoIterator(a.reverse());
			//}
			var itArticle = arrayIterator(aCommande);
			//var itCommande = yoyoIterator(_aCommandes);
			var token = _aCommandes.reduce(bar.reduce.byMethod('getPrix'));
			var i = 0;
			for (var art = itArticle.next(); !art.done; art = itArticle.next()) {
				while (art.value.qt) {
					if ( (token.getPrix() + art.value.prix) > prixMoyen ) { // Si le prix est dépassé on break et on passe au suivant
						token = _aCommandes.reduce(bar.reduce.byMethod('getPrix'));
					}
					token.add(art.value.id, 1);
					art.value.qt--;
				}
			}
			
			this._tokenRing(aCommande, _aCommandes);
			
			return _aCommandes;
		}
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
			this.$contentWrapper.empty();
			var $accordion = $('<ul class="collapsible" data-collapsible="accordion">')
				.appendTo(this.$contentWrapper);
			for (var oCat of aCategorie) {
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
                                    '<input type="number" name="'+ oArt.id +'" min="0" value="0"/>' +
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
                    });
			$accordion.collapsible();
		},
		_get$tab : function(title, oCommande) {
			var oTab = {
				$tab : null,
				$content : null
			};
			oTab.$tab = $('<li class="tab col s3"><a href="#'+ title +'">'+ title +'</a></li>');
			oTab.$content = $('<div id="'+ title +'" class="col s12">');
			oTab.$content.append('<h3>Total :'+ oCommande.getPrix() +'€<h3>');
			var $table = $('<table>').appendTo(oTab.$content);
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
				type : "modal-fixed-footer"
			});
		}
	});
	
	O2.createClass('bar.Ctrl', {
		$nbCarte : null,
		$diviser : null,
		$algoSelector : null,
		oView : null,
		__construct : function(oView) {
			var self = this;
			this.oView = oView;
			this.$contentWrapper = $('#contentWrapper');
			this.$nbCarte = $('#nbCarte');
			this.$algoSelector = $('#algoSelector');
			this.$diviser = $('#diviser')
				.on('click', function() {
					var val = +self.$nbCarte.val();
					var algo = self.$algoSelector.val();
					var aCommande = self.$contentWrapper.serializeArray();
					var mapping = [];
					for (var o of aCommande) {
						if (!o.value || o.value < 0) {
							o.value = 0;
						}
						mapping[+o.name] = +o.value;
					}
					var oCommande = new bar.Commande(mapping);
					oView.showFacture(oCommande, val, algo);
				});
			$(document).on('click', 'input[type=number]', function(e) {
				this.select();
			});
			$('select').material_select();
		}
	});
	
	$(function() {
		var app = new bar.App();
	});
	
})(jQuery);
