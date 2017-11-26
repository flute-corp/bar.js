describe('bar.App', function() {
    describe('__construct :', function() {
        mockUrl(bar.config.API_URL, null);
        mockUrl(bar.config.API_URL + 'login', false);
        var oApp = new bar.App();
        it('Create bar.View', function() {
            expect(oApp.oView).toBeDefined();
        });
        it('Create bar.Ctrl', function() {
            expect(oApp.oCtrl).toBeDefined();
        });
    });
});