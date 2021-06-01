(function ($, O2) {
  /**
   * @property bar.helper
   */
  O2.createObject('bar.helper', {
    'pluralize': function (el) {
      if (Array.isArray(el)) {
        return el.length > 1 ? 's' : ''
      }
      if (typeof el === 'string') {
        return el + 's'
      }
      return +el > 1 ? 's' : ''
    },
    'sort': {
      byKey: function (k, desc) {
        desc = desc | false
        return function (a, b) {
          if (a[k] < b[k])
            return desc ? 1 : -1
          if (a[k] > b[k])
            return desc ? -1 : 1
          // a doit être égal à b
          return 0
        }
      }
    },
    'reduce': {
      byKey: function (k) {
        return function (a, b) {
          return a[k] <= b[k] ? a : b
        }
      }
    },
    'storage': {
      '_getStorage': function () {
        var storage = localStorage.getItem(bar.config.STORAGE_KEY)
        return storage ? JSON.parse(storage) : {}
      },
      '_setStorage': function (o) {
        localStorage.setItem(bar.config.STORAGE_KEY, JSON.stringify(o))
      },
      'import': function () {
        // var oCur;
        // if (oJson) {
        //     for (var date in oJson) {
        //         if (oJson.hasOwnProperty(date) && oJson.date) {
        //             oCur = oJson[date];
        //             if (oCur.hasOwnProperty('user')) {
        //                 oCur.user.forEach(bar.helper.delete.null);
        //             }
        //             if (oCur.hasOwnProperty('cmd')) {
        //                 oCur.cmd.forEach(bar.helper.delete.empty);
        //             }
        //         }
        //     }
        // }
        return this._getStorage()
      },
      'export': function (oData) {
        var copy = $.extend(true, {}, oData)
        for (var key in copy) {
          if (copy[key]) {
            if (copy[key].hasOwnProperty('user')) {
              copy[key]['user'] = $.extend({}, copy[key]['user'])
            }
            if (copy[key].hasOwnProperty('cmd')) {
              copy[key]['cmd'] = $.extend({}, copy[key]['cmd'])
            }
          }
        }

        var oStorage = this._getStorage()
        $.extend(oStorage, copy)
        for (var k in oStorage) {
          if (!oStorage[k]) {
            delete oStorage[k]
          }
        }
        this._setStorage(oStorage)
      }
    },
    'urlB64ToUint8Array': function (base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4)
      var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

      var rawData = window.atob(base64)
      var outputArray = new Uint8Array(rawData.length)

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
      }
      return outputArray
    }
  })

  Date.prototype.toFrench = function () {
    var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

    function zeroInitial (n) {
      if (+n < 10) {
        return '0' + n
      }
      return n
    }

    return zeroInitial(this.getDate()) + ' ' + months[this.getMonth()] + ' ' + this.getFullYear() + ' à ' + zeroInitial(this.getHours()) + ':' + zeroInitial(this.getMinutes()) + ':' + zeroInitial(this.getSeconds())
  }
})(jQuery, O2)
