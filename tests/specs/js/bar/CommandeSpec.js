describe('bar.Commande', function () {
    var oCommande, oFixture = {
        cmd: {
            2: 5,
            4: 4,
            8: 3,
            404: 25
        },
        user: [17, 9, 1, 404]
    }, oExpected = {
        2: 5,
        4: 4,
        8: 3,
        17: 1,
        9: 1,
        1: 1,
        404: 26
    };
    beforeEach(function () {
        oCommande = new bar.Commande(oFixture);
    });
    describe('__construct(oCommande)', function () {
        it('Map oCommande', function () {
            expect(oCommande._oCommande).toBe(oFixture);
            expect(oCommande._commande).toEqual(oExpected);
        });
    });
    describe('.add(idArticle, qt)', function () {
        it('Add element to _commande', function () {
            var oExpected = {
                1: 1,
                2: 6,
                4: 4,
                7: 4,
                8: 3,
                9: 3,
                17: 1,
                404: 26
            };
            oCommande.add(2, 1);
            oCommande.add(7, 4);
            oCommande.add(9, 2);
            expect(oCommande._commande).toEqual(oExpected);
        });
    });
    describe('.getCommande()', function() {
        it('Map command on products', function() {
            var oMapped = [
                $.extend({}, bar.store.articles[1]),
                $.extend({}, bar.store.articles[2]),
                $.extend({}, bar.store.articles[4]),
                $.extend({}, bar.store.articles[8]),
                $.extend({}, bar.store.articles[9]),
                $.extend({}, bar.store.articles[17])
            ];
            $.each(oMapped, function(i, v) {
                v.qt = oExpected[v.id];
            });
            expect(oCommande.getCommande()).toEqual(oMapped);
        });
    });
    describe('.getPrix()', function() {
        it('Return the oCommande.prix', function() {
            expect(oCommande.getPrix()).toBe(15.5);
        });
    });
    describe('.toLocalStorage', function() {
        it('Save the command by call bar.helper.storage.export', function() {
            spyOn(bar.helper.storage, 'export');
            oCommande.toLocalStorage();
            expect(bar.helper.storage.export).toHaveBeenCalled();
        });
    });
    describe('._initDivision(nbCarte)', function() {
        it('Throw if nbCarte is not defined', function() {
            expect(oCommande._initDivision).toThrow();
        });
        it('Return new bar.Commande instances for every cards', function () {
            var init = oCommande._initDivision(2);
            expect(init.length).toBe(2);
            expect(init.every(function(v) { return v instanceof bar.Commande})).toBe(true);
        });
    });
    describe('._tokenRing(aCommande, _aCommandes)', function() {
        it('Share the bill aCommande between all _aCommandes [bar.Commande]', function() {
            var _aCommandes = oCommande._initDivision(5);
            oCommande._tokenRing(oCommande.getCommande(), _aCommandes);
            expect(_aCommandes[0]._commande).toEqual({ 1: 1, 2: 1, 8: 1 });
            expect(_aCommandes[1]._commande).toEqual({ 2: 1, 4: 1, 8: 1 });
            expect(_aCommandes[2]._commande).toEqual({ 2: 1, 4: 1, 8: 1 });
            expect(_aCommandes[3]._commande).toEqual({ 2: 1, 4: 1, 9: 1 });
            expect(_aCommandes[4]._commande).toEqual({ 2: 1, 4: 1, 17: 1 });
        });
    });
    describe('.auPlusEquitable(nbCarte)', function() {
        it('Public method to Share the bill. Sort products by `prix` for better results', function() {
            var _aCommandes = oCommande.auPlusEquitable(5);
            expect(_aCommandes[0]._commande).toEqual({ 4: 1, 9: 1, 17: 1 });
            expect(_aCommandes[1]._commande).toEqual({ 1: 1, 2: 1, 4: 1 });
            expect(_aCommandes[2]._commande).toEqual({ 2: 2, 8: 1 });
            expect(_aCommandes[3]._commande).toEqual({ 2: 1, 4: 1, 8: 1 });
            expect(_aCommandes[4]._commande).toEqual({ 2: 1, 4: 1, 8: 1 });
        });
    });
});