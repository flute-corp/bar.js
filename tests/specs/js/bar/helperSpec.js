describe('bar.helper', function() {
    var aTest;
    beforeEach(function() {
        aTest = [0, 2, 3, 'test', null, '0', ['other','array'], undefined, {any:'object'}];
    });
    describe('bar.helper.pluralize', function() {
        describe('Array case', function() {
            it('Return "s" if array.length > 1', function () {
                expect(bar.helper.pluralize(aTest)).toBe("s");
            });
            it('Return "" if array.length >= 1', function () {
                expect(bar.helper.pluralize(['test'])).toBe("");
                expect(bar.helper.pluralize([])).toBe("");
            });
        });
        describe('Numeric case', function() {
            it('Return "s" if number > 1', function () {
                expect(bar.helper.pluralize(2)).toBe("s");
                expect(bar.helper.pluralize(1.5)).toBe("s");
            });
            it('Return "" if number >= 1', function () {
                expect(bar.helper.pluralize(0)).toBe("");
                expect(bar.helper.pluralize(-1)).toBe("");
                expect(bar.helper.pluralize(0.5)).toBe("");
                expect(bar.helper.pluralize(1)).toBe("");
            });
        });
        describe('String case', function() {
            it("Just append s", function () {
                expect(bar.helper.pluralize("test")).toBe("tests");
            });
        });
        describe('Other case', function() {
            it('Global objects tests', function () {
                expect(bar.helper.pluralize({})).toBe("");
                expect(bar.helper.pluralize(null)).toBe("");
                expect(bar.helper.pluralize(undefined)).toBe("");
            });
        });
    });

    describe('bar.helper.delete', function() {
        describe('bar.helper.delete.null', function() {
            it('Delete null on foreach call', function () {
                var aExpect = [0, 2, 3, 'test', undefined, '0', aTest[6], undefined, aTest[8]];
                aTest.forEach(bar.helper.delete.null);
                expect(JSON.stringify(aTest)).toEqual(JSON.stringify(aExpect));
            });
        });
        describe('bar.helper.delete.zero', function() {
            it('Delete zero on foreach call', function () {
                var aExpect = [undefined, 2, 3, 'test', null, undefined, aTest[6], undefined, aTest[8]];
                aTest.forEach(bar.helper.delete.zero);
                expect(JSON.stringify(aTest)).toEqual(JSON.stringify(aExpect));
            });
        });
    });
});