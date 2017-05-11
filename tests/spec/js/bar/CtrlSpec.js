describe('bar.Ctrl', function() {
    var toastOutDuration = 375;
    var toastInDuration = 300;
    var oCtrl, oView;
    beforeEach(function() {
        loadFixtures('fixture.html');
        oView = new bar.View();
        oCtrl = new bar.Ctrl(oView);
    });
    function rdmizeForm () {
        oCtrl.$contentWrapper.find('input[type="number"]').val(function() {
            return Math.random();
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
                var expectedForm = oCtrl.$contentWrapper.serializeArray();
                rdmizeForm();
                oCtrl.$reset.click();
                expect(oCtrl.$contentWrapper.serializeArray()).toEqual(expectedForm);
            });
            it('It spawn toast', function() {
                oCtrl.$reset.click();
                var $toast = $('.toast')
                expect($toast).toExist();
                expect($toast.text()).toBe('La commande a été vidée Annuler');
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
    });
});