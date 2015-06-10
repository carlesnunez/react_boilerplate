/* global beforeEach, describe, expect, it, spyOn */

'use strict';

var dependency = require('../src/dependency');
var main = require('../src/main');

describe('Main', function() {
    beforeEach(function() {
        spyOn(dependency, 'foo');
    });

    it('calls dependency\'s foo:', function() {
        main.run();
        expect(dependency.foo).toHaveBeenCalledWith('bar');
    });
});
