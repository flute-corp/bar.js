(function ($, O2) {
    /**
     * @property bar.View
     */
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
            bar.store.categories.forEach(function(oCat) {
                $el = $('<div class="collapsible-body col s12">');
                $aCat.push($el);
                $('<li><div class="collapsible-header"><i class="material-icons">'+ oCat.icon +'</i>'+ oCat.label +'</div></li>')
                    .appendTo($accordion)
                    .append($el);
            });
            bar.store.articles.forEach(function(oArt) {
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
                    $this.trigger('change');
                });
            $accordion.collapsible();
        },
        _makeUserAddons : function() {
            if (bar.store.users.length) {
                var $wrapper = $('<div class="input-field col s12">');
                var $select = $('<div class="select-wrapper">').appendTo($wrapper).append('<span class="caret">▼</span>')
                var $input = $('<input class="select-dropdown" readonly="true" data-activates="select-user-pref" value="Choisissez des participants..." type="text" />').appendTo($select);
                var $ul = $('<ul id="select-user-pref" class="dropdown-content select-dropdown multiple-select-dropdown">').appendTo($select);
                $ul.append('<li class="optgroup-option disabled"><span><input type="checkbox" disabled><label></label>Choisissez des participants...</span></li>')
                bar.store.users.forEach(function(oUser, idUser) {
                    $('<li class="optgroup"><span>'+ (oUser.name || '???') +'</span></li>').appendTo($ul);
                    if (Array.isArray(oUser.pref)) {
                        oUser.pref.forEach(function(pref) {
                            if (bar.store.articles[pref]) {
                                $('<li class="optgroup-option"><span><input type="checkbox" name="user['+ idUser +']" value="'+ pref +'"><label></label>'+ bar.store.articles[pref].label +'</span></li>').appendTo($ul);
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
            oCommande[algo](nbCarte).forEach(function(subCommande) {
                aTab.push(self._get$tab((subCommande.id + 1), subCommande));
            });
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
                        $habitue.append('<tr><td>'+ bar.store.users[i].name +'</td><td>'+ bar.store.articles[v].label +'</td></tr>')
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
                        $complement.append('<tr><td>' + bar.store.articles[i].label + '</td><td>' + v + '</td></tr>')
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
})(jQuery, O2);