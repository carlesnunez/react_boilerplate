/** @module dependency */

'use strict';

module.exports = {
    /** Does some stuff. */
    baz: function(qux) {
        return qux.toLowerCase();
    },
    /** Does other stuff. */
    foo: function(bar) {
        return bar.toUpperCase();
    },
};
