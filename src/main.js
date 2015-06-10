/** @module main */

'use strict';

var dependency = require('./dependency.js');

module.exports = {
    /** Executes the module. */
    run: function() {
        dependency.foo('bar');
    }
};
