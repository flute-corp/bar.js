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
                                        $.extend(bar.store.login, data);
                                        var pref = bar.store.login.pref;
                                        if (Array.isArray(pref)) {
                                            self.$contentWrapper.find('[name="fav[]"]').filter(function() {
                                                return pref.indexOf(+this.value) !== -1;
                                            }).prop('checked', true).trigger('change');
                                        }
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

                    bar.helper.storage.export({'tmp': oForm });
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
            self.easterEgg();
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


            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#FF7777";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#d27001c8";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            var gauge = loadLiquidFillGauge("glass", 28, config1);
            var $glass = this.$glass = $('#glass').one('click', function() {
                var gameOver = false;
                var start = null;
                var alpha = 0;
                var facteurAcceleration = 1;
                var cssLeft = $glass.css('left');
                var left = $glass.offset().left;
                var borneMin = -250;
                var borneMax = window.innerWidth;
                var interpolator = d3.interpolateNumber(40, 80);
                window.addEventListener('deviceorientation', function(e) {
                    alpha = e.gamma * facteurAcceleration;
                });

                function moveGlass(timestamp) {
                    if (start === null) {
                        start = timestamp;
                        gauge.update(1);
                    }
                    if (left < borneMin || borneMax < left) {
                        gameOver = true;
                    }
                    if (timestamp - start >= facteurAcceleration * 500) {
                        gauge.update(interpolator(++facteurAcceleration / 100));
                    }
                    if (!gameOver) {
                        left = left + Math.round(alpha);
                        $glass.css('left', left);
                        requestAnimationFrame(moveGlass);
                    } else {
                        Materialize.toast('Score : '+ parseInt(timestamp - start) / 1000 +'s', 2000);
                        gauge.update(70);
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
            });
        }
    });

    function liquidFillGaugeDefaultSettings(){
        return {
            minValue: 0, // The gauge minimum value.
            maxValue: 100, // The gauge maximum value.
            circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
            circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
            circleColor: "#178BCA", // The color of the outer circle.
            waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
            waveCount: 1, // The number of full waves per width of the wave circle.
            waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
            waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
            waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
            waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
            waveAnimate: true, // Controls if the wave scrolls or is static.
            waveColor: "#178BCA", // The color of the fill wave.
            waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
            textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
            textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
            valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
            displayPercent: true, // If true, a % symbol is displayed after the value.
            textColor: "#045681", // The color of the value text when the wave does not overlap it.
            waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
        };
    }

    function loadLiquidFillGauge(elementId, value, config) {
        if(config === null) config = liquidFillGaugeDefaultSettings();

        var gauge = d3.select("#" + elementId);
        var liquid = gauge.select('#liquid')
            .attr("clip-path", "url(#clipWave" + elementId + ")");
        var radius = 24/2;
        var locationX = 0;
        var locationY = 0;
        var fillPercent = 0.7;
        var waveHeightScale;
        if(config.waveHeightScaling){
            waveHeightScale = d3.scaleLinear()
                .range([0,config.waveHeight,0])
                .domain([0,50,100]);
        } else {
            waveHeightScale = d3.scaleLinear()
                .range([config.waveHeight,config.waveHeight])
                .domain([0,100]);
        }

        var textFinalValue = parseFloat(value).toFixed(2);
        var circleThickness = config.circleThickness * radius;
        var circleFillGap = config.circleFillGap * radius;
        var fillCircleMargin = circleThickness + circleFillGap;
        var fillCircleRadius = radius - fillCircleMargin;
        var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);

        var waveLength = fillCircleRadius*2/config.waveCount;
        var waveClipCount = 1+config.waveCount;
        var waveClipWidth = waveLength*waveClipCount;

        // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
        var textRounder = function(value){ return Math.round(value); };
        if(parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(1); };
        }
        if(parseFloat(textFinalValue) !== parseFloat(textRounder(textFinalValue))){
            textRounder = function(value){ return parseFloat(value).toFixed(2); };
        }

        // Data for building the clip wave area.
        var data = [];
        for(var i = 0; i <= 40*waveClipCount; i++){
            data.push({x: i/(40*waveClipCount), y: (i/(40))});
        }

        // Scales for drawing the outer circle.
        d3.scaleLinear().range([0,2*Math.PI]).domain([0,1]);
        d3.scaleLinear().range([0,radius]).domain([0,radius]);

        // Scales for controlling the size of the clipping path.
        var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
        var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);

        // Scales for controlling the position of the clipping path.
        var waveRiseScale = d3.scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
            .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
            .domain([0,1]);
        var waveAnimateScale = d3.scaleLinear()
            .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
            .domain([0,1]);

        // Center the gauge within the parent SVG.
        var gaugeGroup = gauge.append("g")
            .attr('transform','translate('+locationX+','+locationY+')');

        // The clipping wave area.
        var clipArea = d3.area()
            .x(function(d) { return waveScaleX(d.x); } )
            .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
            .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );

        var waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave" + elementId);
        var wave = waveGroup.append("path")
            .datum(data)
            .attr("d", clipArea)
            .attr("T", 0);
        // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
        var waveGroupXPosition = fillCircleMargin+fillCircleRadius*2-waveClipWidth;
        if(config.waveRise){
            waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(0)+')')
                .transition()
                .duration(config.waveRiseTime)
                .attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')')
                .on('start', function(){
                    wave.attr('transform','translate(1,0)');
                }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        } else {
            waveGroup.attr('transform','translate('+waveGroupXPosition+','+waveRiseScale(fillPercent)+')');
        }

        if(config.waveAnimate) animateWave();

        function animateWave() {
            if (!wave.empty()) {
                wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
                wave.transition()
                    .duration(config.waveAnimateTime * (1 - wave.attr('T')))
                    .ease(d3.easeLinear)
                    .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
                    .attr('T', 1)
                    .on('end', function () {
                        wave.attr('T', 0);
                        animateWave(config.waveAnimateTime);
                    });
            }
        }
        function GaugeUpdater(){
            this.update = function(value){
                var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
                var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
                var waveRiseScale = d3.scaleLinear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                    .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
                    .domain([0,1]);
                var newHeight = waveRiseScale(fillPercent);
                var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
                var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);
                var newClipArea;
                if(config.waveHeightScaling){
                    newClipArea = d3.area()
                        .x(function(d) { return waveScaleX(d.x); } )
                        .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                        .y1(function(d) { return (fillCircleRadius*2 + waveHeight); } );
                } else {
                    newClipArea = clipArea;
                }

                var newWavePosition = config.waveAnimate?waveAnimateScale(1):0;
                wave.transition()
                    .duration(0)
                    .transition()
                    .duration(config.waveAnimate?(config.waveAnimateTime * (1-wave.attr('T'))):(config.waveRiseTime))
                    .ease(d3.easeLinear)
                    .attr('d', newClipArea)
                    .attr('transform','translate('+newWavePosition+',0)')
                    .attr('T','1')
                    .on("end", function(){
                        if(config.waveAnimate){
                            wave.attr('transform','translate('+waveAnimateScale(0)+',0)');
                            animateWave(config.waveAnimateTime);
                        }
                    });
                waveGroup.transition()
                    .duration(config.waveRiseTime)
                    .attr('transform','translate('+waveGroupXPosition+','+newHeight+')')
            }
        }

        return new GaugeUpdater();
    }
})(jQuery, O2);