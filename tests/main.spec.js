/* global beforeEach, describe, expect, it, spyOn */

'use strict';

var dependency = require('../src/dependency');

import {run} from '../src/main';

describe('Main', function() {
    beforeEach(function() {
        spyOn(dependency, 'foo');
    });

    it('calls dependency\'s foo:', function() {
        run();
        expect(dependency.foo).toHaveBeenCalledWith('bar');
    });
});
