module.exports = function() {
    "use strict";
    var asyncFlow = [];
    if (arguments.length === 1) {
        asyncFlow.push(arguments[0]);
    }
    else if (arguments.length === 2) {
        asyncFlow.push(arguments[0]);
        asyncFlow.push(arguments[1]);
    }
    return asyncFlow;
};