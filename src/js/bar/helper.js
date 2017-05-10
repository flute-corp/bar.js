(function ($, O2) {
    /**
     * @property bar.helper
     */
    O2.createObject('bar.helper', {
        "pluralize": function(el) {
            if (Array.isArray(el)) {
                return el.length > 1 ? 's' : '';
            }
            return +el > 1 ? 's' : '';
        },
        "delete": {
            "null": function (v, i, a) {
                if (v === null) {
                    delete a[i];
                }
            },
            "zero": function (v, i, a) {
                if (v.toString() !== '0') {
                    delete a[i];
                }
            },
            "empty": function (v, i, a) {
                if (!+v) {
                    delete a[i];
                }
            }
        },
        "filter": {
            "null" : function (v) {
                return v !== null;
            },
            "zero" : function (v) {
                return v.toString() !== '0';
            },
            "empty" : function (v) {
                return +v;
            }
        },
        "sort": {
            byKey : function(k) {
                return function(a, b) {
                    if (a[k] > b[k])
                        return -1;
                    if (a[k] < b[k])
                        return 1;
                    // a doit être égal à b
                    return 0;
                }
            }
        },
        "reduce": {
            byMethod : function(mth) {
                return function(a, b) {
                    return a[mth]() <= b[mth]() ? a : b;
                }
            }
        },
        "storage": {
            '_getStorage' : function () {
                var storage = localStorage.getItem(bar.config.STORAGE_KEY);
                return storage ? JSON.parse(storage) : {};
            },
            '_setStorage' : function (o) {
                localStorage.setItem(bar.config.STORAGE_KEY, JSON.stringify(o));
            },
            'import': function() {
                var oJson = this._getStorage();
                var oCur;
                for (var date in oJson) {
                    if (oJson.hasOwnProperty(date)) {
                        oCur =  oJson[date];
                        if (oCur.user) {
                            oCur.user.forEach(bar.helper.delete.null);
                        }
                        if (oCur.cmd) {
                            oCur.cmd.forEach(bar.helper.delete.empty);
                        }
                    }
                }
                return oJson;
            },
            'export': function(oData) {
                var oStorage = this._getStorage();
                $.extend(true, oStorage, oData);
                this._setStorage(oStorage);
            }
        }
    });
})(jQuery, O2);