describe('bar.View', function () {
    var oView, $contentWrapper;
    beforeEach(function () {
        loadFixtures('fixture.html');
        oView = new bar.View();
    });
    describe('__construct', function () {
        it('Find $contentWrapper', function () {
            expect(oView.$contentWrapper).toBeDefined();
        });
    });
    describe('.showHome()', function () {
        var $contentWrapper;
        beforeEach(function () {
            loadFixtures('fixture.html');
            oView = new bar.View();
            oView.showHome();
            $contentWrapper = oView.$contentWrapper;
        });
        it('Generate the main view', function () {
            $contentWrapper = oView.$contentWrapper;
            expect($contentWrapper).toContainElement('.collapsible', 'Must contain an accordion');
        });
        it('Draw categories', function () {
            expect($contentWrapper.find('.collapsible-header').length).toBe(Object.keys(bar.store.categories).length, 'Must draw all categories');
        });
        describe('Products', function () {
            it('Draw all products', function () {
                expect($contentWrapper.find('.artCard').length).toBe(Object.keys(bar.store.articles).length, 'Must draw all product');
            });
            it('Manage input state', function () {
                var $input = $contentWrapper.find('.floatingArea input').first();
                var $remove = $contentWrapper.find('.floatingArea .btn-floating').first();
                var $add = $remove.siblings('.add');
                expect($input.val()).toBe('0', 'Default input val is zero');

                $add.click();
                expect($input.val()).toBe('1', '$add btn add one drink');

                $remove.click();
                expect($input.val()).toBe('0', '$remove btn remone one drink');

                $remove.click();
                expect($input.val()).toBe('0', 'Input can\' be negative');
            });
            it('Manage star state', function () {
                var $star = $contentWrapper
                    .find('.starswitch input').first();
                $star.trigger('change');
                expect($star.attr('checked')).toBe(undefined, 'Default checked is null');
                $star[0].checked = true;
                $star.trigger('change');
                expect($star.attr('checked')).toBe('checked', 'Attr checked in checked when checked');
            });
            it('Restore star if logged', function() {
                bar.store.login = bar.store.users[1];
                oView.showHome();
                expect($contentWrapper.find('.starswitch input:checked').length).toBe(bar.store.login.pref.length);
                delete bar.store.login;
            });
        });
    });
    describe('.makeUserAddons()', function () {
        it('Generate the user addons', function () {
            oView.makeUserAddons();
            var $userAddons = oView.$userAddons;
            expect($userAddons).toContainElement('#quickBillModal', 'The QuickBill is generate');

            expect($userAddons.find('.optgroup').length).toBe(Object.keys(bar.store.users).length, 'Generate an entry for all users');

            oView.makeUserAddons();
            expect($userAddons).not.toBeInDOM('Because second call remove previous $userAddon');

            var $li = oView.$userAddons.find('li.optgroup-option').eq(1);
            var $checkbox = $li.find('input[type="checkbox"]');
            $li.click();
            expect($checkbox).toBeChecked('The checkbox must be checked');
            $li.click();
            expect($checkbox).not.toBeChecked('The checkbox must be unchecked');

            $li.click();
            $li.nextAll('li.optgroup-option').first().click();
            expect($checkbox).not.toBeChecked('The checkbox must be unchecked when other choice is select');
        });
        it('Restore all users selection', function() {
            oView.makeUserAddons();
            oView.$userAddons.find('li.optgroup-option').click();

            var oldVal = JSON.stringify(oView.$contentWrapper.serializeObject().user);
            oView.makeUserAddons();
            expect(JSON.stringify(oView.$contentWrapper.serializeObject().user)).toBe(oldVal, 'Must restore all values');
        });
        it('Reset $li statut on form reset', function() {
            oView.makeUserAddons();
            oView.$userAddons.find('li.optgroup-option').click();
            oView.$contentWrapper[0].reset();
            expect(oView.$userAddons.find('li.optgroup-option.active').length).toBe(0, 'All $li must be inactive');
        });
        it('Change location #hash on input click', function() {
            oView.makeUserAddons();
            oView.$userAddons.find('[data-target="quickBillModal"]').click();
            expect(window.location.hash).toBe('#quickBill', 'The hash myse be #quickBill')
        });
        it('Close modal if location !== #quickBill', function() {
            oView.makeUserAddons();
            var $modal = $('#quickBillModal');
            oView.$userAddons.find('[data-target="quickBillModal"]').click();

            expect($modal).toHaveClass('open', 'Modal must be open');
            window.location.hash = '#';
            $(window).trigger('hashchange');
            expect($modal).not.toHaveClass('open', 'Modal wust be close');
        })
    });
    describe('.showFacture(oCommande, nbCarte, algo)', function () {
        var commandeFixture = {
            cmd: {
                2: 5,
                4: 4,
                8: 3
            },
            user: [17, 9, 1]
        }, $toast;
        it('Show the bill', function () {
            var oCommande = new bar.Commande(commandeFixture);
            var $modal = oView.showFacture(oCommande, 2);
            expect($modal).toBeInDOM('Show the modal');
            expect($modal.find('.tab').length).toBe(3);
        });
        it('Show toast if nbCarte <= 0 or command is empty', function () {
            expect(oView.showFacture(null, 0)).toBe(undefined);
            $toast = $('.toast:contains("Vous devez au moins avoir une carte")');
            expect($toast).toBeInDOM();
            $toast.remove();

            expect(oView.showFacture(null, -1)).toBe(undefined);
            $toast = $('.toast:contains("Le bar ne fait pas crédit !")');
            expect($toast).toBeInDOM();
            $toast.remove();

            expect(oView.showFacture(new bar.Commande(), 2)).toBe(undefined);
            $toast = $('.toast:contains("Votre commande est vide")');
            expect($toast).toBeInDOM();
            $toast.remove();
        });
        it('Can save and reset the command to localstorage', function() {
            var oCommande = new bar.Commande(commandeFixture);
            var $modal = oView.showFacture(oCommande, 2);
            spyOn(oCommande, 'toLocalStorage');
            var detect = jasmine.createSpy('detect');
            $('#resetBtn').on('click', detect);
            $modal.find('.modal-footer .modal-action').eq(1).click();

            expect(oCommande.toLocalStorage).toHaveBeenCalled();
            expect(detect).toHaveBeenCalled();
        });
        it('Can save and keep the command', function () {
            var oCommande = new bar.Commande(commandeFixture);
            var $modal = oView.showFacture(oCommande, 2);
            spyOn(oCommande, 'toLocalStorage');
            var detect = jasmine.createSpy('detect');
            $('#resetBtn').on('click', detect);
            $modal.find('.modal-footer .modal-action').eq(0).click();

            expect(oCommande.toLocalStorage).toHaveBeenCalled();
            expect(detect).not.toHaveBeenCalled();
        });
    });
    describe('.showHistory(oHistory)', function () {
        var historyFixture = {
            "2017-11-11T23:30:26.870Z": {
                "user": {"2": "18"},
                "cmd": {"1": "3", "2": "4", "10": "4", "18": "5"},
                "fav": ["1", "3", "7"]
            }
        };
        it('Show a toast with `L`\'historique est vide`', function() {
            expect(oView.showHistory()).toBe(undefined);
            var $toast = $('.toast:contains("L\'historique est vide")');
            expect($('.toast:contains("L\'historique est vide")')).toBeInDOM('Must show the toast');
            $toast.remove();
        });
        it('Show the history', function() {
            var $m = oView.showHistory(historyFixture);
            expect($m).toBeInDOM('Must show history modal');
            expect($m.find('.collapsible-header:contains("12 novembre 2017 à 00:30:26 - 1 habitué - 4 compléments")')).toBeInDOM('Got one accordion element');
            var $table = $m.find('table');
            expect($table.length).toBe(2, 'Show 2 table');

            expect($table.eq(0).find('tr').length).toBe(2);
            expect($table.eq(1).find('tr').length).toBe(5);
        });
        it('Can remove history entry', function(done) {
            var $m = oView.showHistory(historyFixture);
            spyOn(bar.helper.storage, 'export');
            $m.find('.collapsible-header').click();
            var $btn = $m.find('.btn.red');
            var $li = $btn.closest('li.active');

            $btn.click();

            expect(bar.helper.storage.export).toHaveBeenCalledWith({"2017-11-11T23:30:26.870Z": null});
            setTimeout(function () {
                expect($li).toHaveClass('hide');
                done();
            }, 800);
        });
        it('Can restore from history entry', function() {
            var $m = oView.showHistory(historyFixture);
            var $btn = $m.find('.btn.green');
            spyOn(oView.$contentWrapper, 'deserializeObject');
            $btn.click();
            expect(oView.$contentWrapper.deserializeObject).toHaveBeenCalledWith(historyFixture["2017-11-11T23:30:26.870Z"]);
            expect($('.toast:contains("Restauration terminée !")')).toBeInDOM("Must show a confirm toast");
        });

    })
});