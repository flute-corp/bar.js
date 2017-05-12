var Materializer = (function($) {

    function ajax(url, options) {
        $('#AjaxInProgress').show();
        return $.ajax(url, options).error(ajaxError.bind(this)).always(function() {
            $('#AjaxInProgress').hide('slow');
        });
    }

    function getJSON(url, options, success) {
        $('#AjaxInProgress').show();
        return $.getJSON(url, options, success).error(ajaxError.bind(this)).always(function() {
            $('#AjaxInProgress').hide('slow');
        });
    }

    function ajaxError(xhr, textStatus, errorThrown) {
        $('#AjaxInProgress').hide('slow');
        function parseException(exception) {
            var html = $.map(exception, function(value, index) {
                if ($.isPlainObject(value) || $.isArray(value)) {
                    return parseException(value) +'<br/>';
                } else {
                    return index +' : '+ value +'<br/>';
                }
            });
            return html;
        }
        var data = xhr.responseText;
        var $msg = $('<div>').append("<strong>Code status :</strong>").append("<span> " + xhr.status + "</span>").append("<br/>").append("<strong>Réponse :</strong>").append("<span> " + xhr.statusText + "</span>").append("<br/>");
        if (data) {
            if (data.match(/<(.+)>/)) { // détection du HTML
                var $dom = $(data);
                var $symfonyException = $('.sf-reset', $dom);
                var $css = $($dom).find('link');
                if ($symfonyException[0]) {
                    var symfonyException = $('<div>').append($css).append($symfonyException).html();
                } else {
                    var symfonyException = $.parseHTML(data)
                }
                $msg.append("<strong>Réponse de serveur :</strong><br/>").append(symfonyException);
            } else {
                var json = JSON.parse(data);
                if (typeof json == 'object') {
                    $msg.append("<br/><strong>Réponse du serveur (JSON) :</strong><br/><p>" + parseException(json.error.exception) + '</p>');
                } else {
                    $msg.append("<br/><strong>Réponse du serveur :</strong><br/><p>" + data + '</p>');
                }
            }
        } else {
            $msg.append("<br/><strong>Aucune réponse du serveur</strong>");
        }
        this.createModal({
            "title" : 'Erreur au chargement de la page',
            "content" : $msg});
    }

    function toast(options) {
        var defaults = {
            toast : {
                message : '',
                displayLength: null,
                className: '',
                completeCallback: null
            },
            btn : []
        };
        var options = $.extend(true, {}, defaults, options);
        var $toast = $('<span>'+ options.toast.message +'</span>');
        var defaultBtn = {
            label: '???',
            color: 'white',
            click: null
        };
        options.btn.forEach(function(v) {
            var btn = $.extend({}, defaultBtn, v);
            $('<a class="waves-effect waves-light btn-flat right '+ btn.color+'-text">'+ btn.label +'</a>').appendTo($toast)
                .on('click', function(e) {
                    if (btn.click && typeof btn.click == 'function') {
                        btn.click.call(this, e);
                    }
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
        });
        Materialize.toast($toast, options.toast.displayLength, options.toast.className, options.toast.completeCallback);
    }
    var curModal = 0;
    function createModal(options) {
        var optionsDefault = {
            "title" : null,
            "content" : "Aucun contenu",
            "type" : '',
            "ready" : function() {},
            "complete" : function() {
                $modal.remove();
            },
            "footer" : {
                "Ok" : {
                    "classe" : "modal-close"
                }
            }
        };
        var settings = $.extend(optionsDefault, options);
        curModal++;
        var $modal = $('<div id="modal' + curModal + '" class="modal ' + settings.type + '"></div>');
        var $modalContent = $('<div class="modal-content">');
        var $modalContentHeader = $('<h4>').append(settings.header);
        var $modalContentContent = $('<p>').append(settings.content);
        var $modalFooter = $('<div class="modal-footer">');
        $.each(settings.footer, function(key, button) {
            var $button = $('<a href="#!" class=" modal-action waves-effect waves-green btn-flat ' + button.classe + '">' + key + '</a>');
            $button.on('click', function(e) {
                e.preventDefault();
            });
            if (button.callback) {
                button.callback($modal, $button);
            }
            $modalFooter.prepend($button);
        });
        $modalContent.append($modalContentHeader, $modalContentContent);
        $modal.append($modalContent, $modalFooter);
        $('body').append($modal);
        $modal.modal(settings);
        $modal.modal('open');
        $modal.materializeLayout();
        return $modal;
    }

    function createOverlay(options) {
        var optionsDefault = {
            "content" : ""
        };
        var settings = $.extend(optionsDefault, options);
        $(settings.content)
            .css("margin","auto")
            .on('click', function(e) {
                e.stopPropagation();
            });
        var $overlay = $('<div class="lean-overlay valign-wrapper" style="z-index: 1002; display:flex; background: rgba(0, 0, 0, 0.5);"></div>').append(settings.content).appendTo($('body'));
        $overlay.on('click', function() {
            $overlay.animate({ opacity : 0 }, 500, function() {
                $overlay.remove();
                $overlay = null;
            });
        });
        return $overlay;
    }
    $(function() {
        var appName = document.title;
//        $(window).on('hashchange', function(e) {
//            methodAjax(this.location.hash);
//            document.title = appName + ' - ' + this.location.hash;
//            e.preventDefault();
//        });
//        $(document).on('submit', 'form', function(e) {
//            action = $(this).attr('action') || window.location.hash;
//            var prevent = methodAjax(action, this.target, this);
//            e.preventDefault();
//        });
//        if (this.location.hash) {
//            methodAjax(this.location.hash);
//        }
    });

    /**
     * Function serializeObject
     * @return Object : Le résultat de la serialization d'un formulaire sous format d'objet key => value
     */
    $.fn.serializeObject = function(forceObject){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            if (forceObject) base = {};
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, {}, json, merge);
        });

        return json;
    };
    $.fn.deserializeObject = function (oForm) {
        function deserializeForm(xTableau, oResult, sRoot) {
            if (oResult === undefined) {
                oResult = {};
            }
            if (sRoot === undefined) {
                sRoot = '';
            }
            var sType = typeof xTableau;
            if (xTableau === null) {
                sType = 'null';
            }

            switch (sType) {
                case 'object':
                    for (var iKey in xTableau) {
                        deserializeForm(
                            xTableau[iKey],
                            oResult,
                            sRoot + (sRoot ? '[' : '') + iKey + (sRoot ? ']' : '')
                        );
                    }
                    break;

                default:
                    oResult[sRoot] = xTableau;
            }
            return oResult;
        };
        var $el, val, $this = this;
        oForm = deserializeForm(oForm);
        for (var key in oForm) {
            val = oForm[key];
            $el = $this.find('[name="'+ key +'"]');
            switch ($el.attr('type')) {
                case 'checkbox':
                    $el = $el.filter(function() { return this.value == val; }).prop('checked', true);
                    break;
                default:
                    $el.val(val);
                    break;
            }
            $el.trigger('change');
        }
        return this;
    }

    /**
     * Méthode de convertion automatique du HTML au materialize
     *
     * @return : this
     */
    $.fn.materializeLayout = function() {
        $(this).each(function() {
            var $this = $(this);
            // transformation des select
            $('select', $this).material_select();
            $("button[type='submit']", $this).each(function() {
                if (!$(this).hasClass('btn')) {
                    $(this).append('<i class="material-icons right">send</i>');
                }
            });
            $("button", $this).each(function() {
                if (!$(this).hasClass('btn')) {
                    $(this).addClass('btn waves-effect waves-light');
                }
            });
            $('ul.tabs').tabs();
        });
        return this;
    };

    /**
     * Méthode de gestion des hamburger
     *
     * @return : this
     */

    (function ($) {
        var methods = {
            "init" : function() {
                var $this = this;
                if ($this.materialHamburger('isArrow')) {
                    $this.materialHamburger('fromArrow');
                } else {
                    $this.materialHamburger('toArrow');
                }
                return this;
            },
            "toArrow" : function() {
                var $this = this;
                if (!$this.materialHamburger('isArrow')) {
                    $this.children().removeClass('material-design-hamburger__icon--from-arrow').addClass('material-design-hamburger__icon--to-arrow');
                }
                return this;
            },
            "fromArrow" : function() {
                var $this = this;
                if ($this.materialHamburger('isArrow')) {
                    $this.children().removeClass('material-design-hamburger__icon--to-arrow').addClass('material-design-hamburger__icon--from-arrow');
                }
                return this;
            },
            "isArrow" : function() {
                var $this = this;
                return $this.children().hasClass('material-design-hamburger__icon--to-arrow');
            }
        };
         $.fn.materialHamburger = function(methodOrOptions) {
            if ( methods[methodOrOptions] ) {
                return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
                // Default to "init"
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.materialHamburger' );
            }
            return this;
         }; // Plugin end
    }( jQuery ));

    /**
     * Méthode de gestion des fabs
     *
     * @return : this
     */

    (function ($) {
        var methods = {
            "init" : function(options) {
                var $wrapper = this.find("fixed-action-btn")
                if (!$wrapper[0]) {
                    $wrapper = $('<div class="fixed-action-btn"></div>');
                }
                $wrapper.prependTo(this).addClass(options.orientation || 'horizontal');
                if (options.clickToToggle) {
                    $wrapper.addClass('click-to-toggle');
                }

                var $wrapperUl = $('<ul>').appendTo($wrapper);

                for (var h in options.buttons) {
                    var btn = options.buttons[h];
                    var $button = $('<li data-tooltip="'+ h +'"><a class="btn-floating '+ (btn.color || 'green') +'" ><i class="material-icons">'+ (btn.icon || '&#xE3C9;') +'</i></a></li>');
                    $wrapperUl.append($button);
                    if (btn.callback) {
                        btn.callback.apply(this, [$button]);
                    }
                }
                this.on('mouseover',function() {
                        $wrapper.openFAB();
                    })
                    .on('mouseleave', function() {
                        $wrapper.closeFAB();
                    });
                return this;
            }
        };
        $.fn.materialFAB = function(methodOrOptions) {
            if ( methods[methodOrOptions] ) {
                return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
                // Default to "init"
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.materialFAB' );
            }
            return this;
        }; // Plugin end
    }( jQuery ));

    return {
        ajax : ajax,
        getJSON : getJSON,
        createModal : createModal,
        createOverlay : createOverlay,
        toast       : toast
    };
})(jQuery);
