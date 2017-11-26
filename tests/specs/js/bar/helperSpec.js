describe('bar.helper', function() {
    var aTest, aFixture = [
        {key:2},
        {key:1},
        {key:3},
        {key:4},
        {key:4},
        {key:1}
    ];
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
    describe('bar.helper.sort', function() {
        var fAsc = bar.helper.sort.byKey('key'),
            fDesc = bar.helper.sort.byKey('key', true);
        describe('.byKey(k, desc)', function() {
            it('Generate a function', function () {
                expect(typeof fAsc).toBe('function');
                expect(typeof fDesc).toBe('function');
            });
            it('Can be use has Array.sort function', function () {
                expect(fAsc({key:1},{key:2})).toBe(-1);
                expect(fAsc({key:2},{key:1})).toBe(1);
                expect(fAsc({key:1},{key:1})).toBe(0);
                expect(aFixture.sort(fAsc)).toEqual([
                    {key:1},
                    {key:1},
                    {key:2},
                    {key:3},
                    {key:4},
                    {key:4}
                ]);
            });
            it('Sort desc if desc true', function() {
                expect(fDesc({key:1},{key:2})).toBe(1);
                expect(fDesc({key:2},{key:1})).toBe(-1);
                expect(fDesc({key:1},{key:1})).toBe(0);
                expect(aFixture.sort(fDesc)).toEqual([
                    {key:4},
                    {key:4},
                    {key:3},
                    {key:2},
                    {key:1},
                    {key:1}
                ]);
            });
        });
    });
    describe('bar.helper.reduce', function() {
        describe('.byKey(k)', function() {
            it('Generate a function', function () {
                expect(typeof bar.helper.reduce.byKey()).toBe('function');
            });
            it('Can be use has Array.reduce function', function () {
                expect(aFixture.reduce(bar.helper.reduce.byKey('key'))).toEqual({key:1});
            });
        });
    });
    describe('bar.helper.storage', function() {
        var oTest = {"bar":"js"},
            f1 = {
                "cmd1": {
                    "user": [5,6,8,9],
                    "cmd": [1,4,8,9]
                }
            },
            f2 = {
                "cmd2": {
                    "user": [9,5,7,6],
                    "cmd": [4,9,6,4]
                }
            };
        beforeEach(function() {
            window.localStorage.clear();
        });
        describe('._getStorage()', function() {
            it('Return [bar.config.STORAGE_KEY] has json', function() {
                window.localStorage.setItem(bar.config.STORAGE_KEY, JSON.stringify(oTest));
                expect(bar.helper.storage._getStorage()).toEqual(oTest);
            });
            it('Return an empty object in clear', function() {
                expect(bar.helper.storage._getStorage()).toEqual({});
            });
        });
        describe('._setStorage(o)', function() {
            it('Save o has string in localStorage[bar.config.STORAGE_KEY]', function() {
                bar.helper.storage._setStorage(oTest)
                expect(window.localStorage.getItem(bar.config.STORAGE_KEY)).toEqual(JSON.stringify(oTest));
            });
        });
        describe('.import()', function() {
            it('Just a public method for _getStorage()', function() {
                expect(bar.helper.storage.import()).toEqual(bar.helper.storage._getStorage());
            });
        });
        describe('.export(data)', function() {
            it('Save data to `bar.config.STORAGE_KEY`', function() {
                bar.helper.storage.export(f1);
                expect(window.localStorage.getItem(bar.config.STORAGE_KEY)).toBe('{"cmd1":{"user":{"0":5,"1":6,"2":8,"3":9},"cmd":{"0":1,"1":4,"2":8,"3":9}}}');
            });
            it('Convert `user` & `cmd` to object', function() {
                bar.helper.storage.export(f1);
                expect(JSON.parse(window.localStorage.getItem(bar.config.STORAGE_KEY)).cmd1.user).toEqual({ 0: 5, 1: 6, 2: 8, 3: 9 });
                expect(JSON.parse(window.localStorage.getItem(bar.config.STORAGE_KEY)).cmd1.cmd).toEqual({ 0: 1, 1: 4, 2: 8, 3: 9 });
            });
            it('Merge data with current storage', function() {
                bar.helper.storage.export(f1);
                bar.helper.storage.export(f2);
                expect(window.localStorage.getItem(bar.config.STORAGE_KEY)).toBe('{"cmd1":{"user":{"0":5,"1":6,"2":8,"3":9},"cmd":{"0":1,"1":4,"2":8,"3":9}},"cmd2":{"user":{"0":9,"1":5,"2":7,"3":6},"cmd":{"0":4,"1":9,"2":6,"3":4}}}');
            });
        });
    });
});