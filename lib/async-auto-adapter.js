var underscore = require("underscore");

module.exports = function() {
    "use strict";
    var asyncFlow = [];
    if (arguments.length === 1) {
        asyncFlow.push(arguments[0]);
    }
    else if (arguments.length === 2) {
        var dependencies = arguments[0].split(" ");
        underscore.each(dependencies, function(dependency) {
            asyncFlow.push(dependency);
        });

        asyncFlow.push(arguments[1]);
    }
    return asyncFlow;
};