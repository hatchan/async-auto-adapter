(function () {
    "use strict";
    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var adapter = function() {
        var asyncFlow = [];
        var asyncCallback, wrapper = null;
        if (arguments.length === 1) {
            asyncCallback = arguments[0];
            wrapper = function(next, results) {
                asyncCallback(next);
            };
            asyncFlow.push(wrapper);
        }
        else if (arguments.length === 2) {
            var dependencies = arguments[0].split(" ");
            _each(dependencies, function(dependency) {
                asyncFlow.push(dependency);
            });

            asyncCallback = arguments[1];
            wrapper = function(next, results) {
                asyncCallback(next);
            };

            asyncFlow.push(wrapper);
        }
        return asyncFlow;
    };

    // AMD / RequireJS
    if (typeof define !== "undefined" && define.amd) {
        define([], function () {
            return adapter;
        });
    }
    // Node.js
    else if (typeof module !== "undefined" && module.exports) {
        module.exports = adapter;
    }
    // included directly via <script> tag
    else {
        window.adapter = adapter;
    }

}());