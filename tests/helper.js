var path = '';
if (typeof window.__karma__ !== 'undefined') {
    path += 'base/';
}
jasmine.getFixtures().fixturesPath = path + 'tests/fixtures/';