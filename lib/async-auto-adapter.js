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

    var mapper = function(path, obj) {
        var buffer = [];
        for (var i = 0; i < path.length; i++) {
            if (obj === undefined) {
                break;
            }

            var c = path[i];
            if (c === ".") {
                obj = obj[buffer.join("")];
                buffer = [];
            }
            else if (c === "[") {
                if (buffer.length > 0) {
                    obj = obj[buffer.join("")];
                }
                buffer = [];
            }
            else if (c === "]") {
                obj = obj[parseInt(buffer.join(""), 10)];
                buffer = [];
            }
            else {
                buffer.push(c);
            }
        }

        if (buffer.length > 0 && obj !== undefined) {
            obj = obj[buffer.join("")];
        }

        return obj;
    };

    var createWrapper = function(map, asyncCallback) {

        return function(next, results) {
            var args = [];
            if (map) {
                _each(map.split(" "), function(arg) {
                    args.push(mapper(arg, results));
                });
            }

            args.push(next);

            asyncCallback.apply(undefined, args);
        };

    };

    var adapter = function() {
        var asyncFlow = [];
        var asyncCallback, wrapper, dependencies = null;
        if (arguments.length === 1) {
            asyncCallback = arguments[0];
            wrapper = createWrapper("", asyncCallback);
            asyncFlow.push(wrapper);
        }
        else if (arguments.length === 2) {
            dependencies = arguments[0].split(" ");
            _each(dependencies, function(dependency) {
                asyncFlow.push(dependency);
            });

            asyncCallback = arguments[1];
            wrapper = createWrapper("", asyncCallback);

            asyncFlow.push(wrapper);
        }
        else if (arguments.length === 3) {
            dependencies = arguments[0].split(" ");
            _each(dependencies, function(dependency) {
                asyncFlow.push(dependency);
            });

            asyncCallback = arguments[2];
            wrapper = createWrapper(arguments[1], asyncCallback);

            asyncFlow.push(wrapper);
        }
        return asyncFlow;
    };

    adapter.mapper = mapper;

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