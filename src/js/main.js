(function($) {
	var aCategorie = [
		{"label":"Soft","icon":"&#xEB41;"},
		{"label":"Binouze","icon":"&#xE544;"},
		{"label":"Miam-miam","icon":"&#xE552;"}
	];
	var aArticles = [
		{"id":0,"cat":0,"label":"Coca-cola", "desc":"Attention aux bulles !", "prix":1,"img":"coca.jpg"},
		{"id":1,"cat":0,"label":"Jus d'orange","desc":"Quand c'est trop c'est tropico","prix":1},
		{"id":2,"cat":0,"label":"Perrier","desc":"Un sirop dedans ?","prix":1},
		{"id":3,"cat":2,"label":"Chips","desc":"Le roi de la pomme de terre","prix":2},
		{"id":4,"cat":2,"label":"Saucisson","desc":"Préciser \"Hallal\" si possible","prix":1.9},
		{"id":5,"cat":1,"label":"Grim bouteille","desc":"La bière des hommes", "prix":1.5}
	];
	
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
		auPlusEquitable : function(nbCarte) {
			var _aCommandes = this._initDivision(nbCarte);
			// Calcul
			var prix = this.getPrix();
			var aCommande = this.getCommande();
			aCommande = aCommande.sort(function(a, b) {
				  if (a.prix > b.prix)
					 return -1;
				  if (a.prix < b.prix)
					 return 1;
				  // a doit être égal à b
				  return 0;
			});
			var token;
			for (var el of aCommande) {
				if (el) {
					for (var i = 0; i < el.qt; i++) {
						token = _aCommandes.reduce(function(a, b) {
							return a.getPrix() < b.getPrix() ? a : b;
						});
						token.add(el.id, 1);
					}
				}
			}
			return _aCommandes;
		},
		auPlusSimple : function(nbCarte) {
			
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
                                '<img src="src/img/'+ ( oArt.img || '404.jpg') +'">' +
                                '<div class="floatingArea">' +
                                    '<a class="btn-floating waves-effect waves-light orange"><i class="material-icons">&#xE15B;</i></a>' +
                                    '<input type="number" name="'+ oArt.id +'" value="0"/>' +
                                    '<a class="btn-floating waves-effect waves-light blue add"><i class="material-icons">&#xE145;</i></a>' +
                                '</div>' +
                            '</div>' +
                            '<div class="card-content">' +
                                '<span class="card-title black-text">'+ oArt.label +'</span>' +
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
                            $input.val(+$input.val() - 1);
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
		_getAll$tab : function(oCommande, nbCarte) {
			var aTab = [];
			aTab.push(this._get$tab("S", oCommande));
			for (var subCommande of oCommande.auPlusEquitable(nbCarte)) {
				aTab.push(this._get$tab((subCommande.id + 1), subCommande));
			}
			return aTab;
		},
		showFacture : function(oCommande, nbCarte) {
			var $modalContent = $('<div class="col s12">');
			if (oCommande.getPrix() != 0) {
				var $tabsWrapper = $('<ul class="tabs tabs-fixed-width">').appendTo($modalContent);
				
				var all$tab = this._getAll$tab(oCommande, nbCarte);
				
				for (var oTab of all$tab) {
					$tabsWrapper.append(oTab.$tab);
					$modalContent.append(oTab.$content);
				}
			} else {
				$modalContent.append('<h3>Votre commande est vide</h3>');
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
		oView : null,
		__construct : function(oView) {
			var self = this;
			this.oView = oView;
			this.$contentWrapper = $('#contentWrapper');
			this.$nbCarte = $('#nbCarte');
			this.$diviser = $('#diviser')
				.on('click', function() {
					var val = +self.$nbCarte.val();
					var aCommande = self.$contentWrapper.serializeArray();
					var mapping = [];
					for (var o of aCommande) {
						mapping[+o.name] = +o.value;
					}
					var oCommande = new bar.Commande(mapping);
					oView.showFacture(oCommande, val);
				});
		}
	});
	
	
	$(function() {
		var app = new bar.App();
	});
	//var com = new bar.Commande(aCommande);
	//console.log(com.getCommande());
	//var double = com.auPlusEquitable(2);
	//console.log(com.getPrix(), double, double[0].getPrix(), double[1].getPrix());
	//console.log(algo.auPlusEquitable(2));
})(jQuery);
