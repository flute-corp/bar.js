var path = '';
if (typeof window.__karma__ !== 'undefined') {
    path += 'base/';
}
jasmine.getFixtures().fixturesPath = path + 'tests/fixtures/';

var oldAjax = jQuery.ajax;
var mockedUrl = {};
function mockUrl(url, response) {
    mockedUrl[url] = response;
}
jQuery.ajax = function () {
    var url = arguments[0], opt = arguments[1];

    if (typeof url === 'object') {
        opt = url;
        url = opt.url || 'nope';
    }

    if (mockedUrl.hasOwnProperty(url) && mockedUrl[url] !== undefined) {
        var def = $.Deferred();
        if (mockedUrl[url] === null) {
            def.reject({
                readyState: 4,
                responseText: 'Rejected by mock',
                status: 4,
                statusText: 'Rejected by mock'
            });
        } else {
            def.resolve($.extend(true, {}, mockedUrl[url])); // Return a deep copy to preserve moked original data
        }
        return def.promise();
    }
    return oldAjax.apply(this, arguments);
};
jasmine.getEnv().addReporter({
    jasmineDone: function () {
        $('body').attr('style', null);
        $('.modal, .modal-overlay, .toast').remove();
    }
});