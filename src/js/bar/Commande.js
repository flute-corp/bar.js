(function ($, O2) {
    /**
     * @property bar.Commande
     */
    O2.createClass('bar.Commande', {
        id : null,
        _commande : null,
        _oCommande : null,
        __construct : function(oCommande) {
            var self = this;
            this._commande = [];
            this._oCommande = {};
            for (var i = 0; i < bar.store.articles.length; i++) {
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
            var _aCommande = $.extend(true, [], bar.store.articles);
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
                        a += bar.store.articles[i]['prix'] * b;
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
            bar.helper.storage.export(oJson);
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
            aCommande.forEach(function(el) {
                if (el) {
                    for (var i = 0; i < el.qt; i++) {
                        token = _aCommandes.reduce(bar.helper.reduce.byMethod('getPrix'));
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
})(jQuery, O2);