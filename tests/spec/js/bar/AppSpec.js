describe('bar.App', function() {
    var oApp = new bar.App();
    describe('__construct :', function() {
        it('Create bar.View', function() {
            expect(oApp.oView).toBeDefined();
        });
        it('Create bar.Ctrl', function() {
            expect(oApp.oCtrl).toBeDefined();
        });
    });
});