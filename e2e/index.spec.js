browser.waitForAngularEnabled(false);

describe('Essential JS 2 seed test', function() {
    it('Test the Essential JS 2 typescript sample', function() {
        browser.get('http://localhost:3000/index.html');
        var button = element(by.css('.e-btn'));
        expect(button).not.toBe(undefined);
    });
});