describe('bar.Ctrl', function() {
    var toastOutDuration = 375;
    var toastInDuration = 300;
    var oCtrl, oView;
    function mockFlushProfile(response) {
        mockUrl(bar.config.API_URL + 'user', response);
        mockUrl(bar.config.API_URL + 'register', response);
    }
    beforeEach(function() {
        var mock = $.extend(true, {}, bar.store);
        delete mock.login;
        mockUrl(bar.config.API_URL, mock);
        loadFixtures('fixture.html');
        oView = new bar.View();
        oCtrl = new bar.Ctrl(oView);
    });
    function rdmizeForm () {
        oCtrl.$contentWrapper.find('input[type="number"]').val(function() {
            return Math.floor(Math.random() * 10);
        });
    }
    describe('__construct :', function() {
        it('Require a view', function() {
            oCtrl = new bar.Ctrl();
            expect(oCtrl.oView).toBe(null);
        });
        it('Preserve oView instance', function() {
            expect(oCtrl.oView).toBe(oView);
        });
        it('Get $contentWrapper', function() {
            expect(oCtrl.$contentWrapper).toExist();
            expect(oCtrl.$contentWrapper.length).toBe(1);
        });
        describe('Manage $reset', function() {
            it('Find $reset', function() {
                expect(oCtrl.$reset).toExist();
            });
            it('It reset form', function() {
                oCtrl.$contentWrapper[0].reset();
                var expectedForm = oCtrl.$contentWrapper.serializeArray();
                rdmizeForm();
                oCtrl.$reset.click();
                expect(oCtrl.$contentWrapper.serializeArray()).toEqual(expectedForm);
            });
            it('It spawn toast', function() {
                oCtrl.$reset.click();
                var $toast = $('.toast');
                expect($toast).toExist();
                expect($toast.last().text()).toBe('La commande a été vidéeAnnuler');
            });
            it('Le toast dispose de l\'option annuler', function() {
                rdmizeForm();
                var expectedForm = oCtrl.$contentWrapper.serializeArray();
                oCtrl.$reset.click();
                var $toast = $('.toast');
                $toast.find('a').trigger('click');
                expect(oCtrl.$contentWrapper.serializeArray()).toEqual(expectedForm);
            });
        });
        describe('Manage $restore', function() {
            it('Show history', function() {
                spyOn(oView,'showHistory');
                oCtrl.$restore.trigger('click');
                expect(oView.showHistory).toHaveBeenCalled();
            });
        });
        describe('Manage $diviser', function() {
            it('Execute the divide', function() {
                spyOn(oView,'showFacture');
                oCtrl.$diviser.trigger('click');
                expect(oView.showFacture).toHaveBeenCalled();
            });
        });
        describe('Manage $login', function() {
            var $m;
            beforeEach(function() {
                $('.modal').remove();
            });

            afterEach(function() {
                delete bar.store.login;
            });
            it('Submit button submit active form', function() {
                mockUrl(bar.config.API_URL + 'login', null);
                oCtrl.$login.trigger('click');
                $m = $('.modal').last();
                var spyEvent = spyOnEvent($m.find('form.active'), 'submit')
                $m.find('.modal-action').click();
                expect(spyEvent).toHaveBeenTriggered();
            });
            describe('Show login/register modal if not logged', function() {

                beforeEach(function() {
                    mockUrl(bar.config.API_URL + 'login', bar.store.users[2]);
                    delete bar.store.login;
                    oCtrl.$login.trigger('click');
                    $m = $('.modal').last();
                });
                afterEach(function() {
                    mockUrl(bar.config.API_URL + 'login', null);
                });
                it('Has #log and #register tabs', function() {
                    expect($m.find('#log')).toBeInDOM();
                    expect($m.find('#register')).toBeInDOM();
                });
                it('Try login on submit #log form', function() {
                    $('.toast').remove();
                    $m.find('form').removeClass('active');
                    $m.find('#log').addClass('active').trigger('submit');
                    expect(bar.store.login).toEqual(bar.store.users[2]);
                    // expect(oCtrl.$contentWrapper.find('[name="fav[]"]').length).toBe(bar.store.login.pref.length, "Must bind preferences")
                    expect($('.toast:contains("Bonjour ' + bar.store.login.label +'")')).toBeInDOM('Must show Welcome message');
                });
                it('Try register on submit #register form', function() {
                    var mockedUser = {
                        label: 'MockedUser'
                    };

                    mockFlushProfile(mockedUser);
                    $('.toast').remove();
                    $m.find('#r-username').val(mockedUser.label);
                    $m.find('#r-password').val('secretPassword');
                    $m.find('#register').trigger('submit');
                    expect($('.toast:contains("Bienvenue ' + mockedUser.label +'")')).toBeInDOM('Must show Welcome message');
                    expect(bar.store.login).toEqual(mockedUser);
                });
            });

            describe('Show login modify if logged', function() {
                beforeEach(function() {
                    bar.store.login = bar.store.users[1];
                    oCtrl.$login.trigger('click');
                    $m = $('.modal').last();
                });
                it('Has modify form', function() {
                    expect($m.find('form.col.s12.active')).toBeInDOM();
                });
                it('Check password confirm on submit', function() {
                    mockFlushProfile(bar.store.login);
                    spyOn(oCtrl,'flushProfile');
                    $('#m-password', $m).val('GoodPassword');
                    $('#m-password2', $m).val('WrongPassword');
                    $('.toast').remove();
                    $m.find('form.col.s12.active').trigger('submit');

                    expect($('.toast:contains("Les mots de passe ne sont pas identique")')).toBeInDOM();
                    expect(oCtrl.flushProfile).not.toHaveBeenCalled();
                });
                it('Check flush profile on submit', function() {
                    mockFlushProfile(bar.store.login);
                    $('.toast').remove();
                    $m.find('form.col.s12.active').trigger('submit');
                    expect($('.toast:contains("Votre profil à été mis à jour")')).toBeInDOM();
                });
                it('Got #logoutBtn', function() {
                    mockUrl(bar.config.API_URL + 'logout',true);
                    var $btn = $('#logoutBtn', $m);
                    expect($btn).toBeInDOM();
                    $('.toast').remove();
                    $btn.click();
                    expect(bar.store.login).toBe(null);
                    expect($('.toast:contains("Vous êtes déconnecté")')).toBeInDOM('Must show a toast');
                });
            });
        });
        describe('Manage .help btn', function() {
            it('Lauch .discover()', function() {
                spyOn(oCtrl, 'discover');
                $('.help').click();
                expect(oCtrl.discover).toHaveBeenCalled();
            });
        });
    });
});