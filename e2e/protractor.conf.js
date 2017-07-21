exports.config = {

    allScriptsTimeout: 11000,

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000
    },

    onPrepare: function() {
        browser.waitForAngularEnabled(false);
    },

    specs: ['./*.spec.js']
};