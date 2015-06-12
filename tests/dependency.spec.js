/* global describe, expect, it */

'use strict';

import {foo} from '../src/dependency';

describe('Dependency', function() {
    it('foo method works:', function() {
        expect(foo('bar')).toBe('BAR');
    });
});
