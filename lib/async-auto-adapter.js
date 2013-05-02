module.exports = function() {
    "use strict";
    if (arguments.length === 1) {
        var callback = arguments[0];
        return [callback];
    }
    else if (arguments.length === 2) {
        var dependency = arguments[0];
        var callback = arguments[1];
        return [dependency, callback];
    }
};