/* global describe, expect, it */

'use strict';

var dependency = require('../src/dependency');

describe('Dependency', function() {
    it('foo method works:', function() {
        expect(dependency.foo('bar')).toBe('BAR');
    });
});
