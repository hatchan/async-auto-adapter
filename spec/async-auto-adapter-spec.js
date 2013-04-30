var buster = require("buster");
var adapter = require("../index");

buster.spec.expose();

var spec = describe("async-auto-adapter", function(){
    "use strict";
    before(function() {
    });

    describe("when given a single function", function() {
        before(function() {
            this.callback = function() { var foo = "bar"; };
            this.result = adapter(this.callback);
        });

        itEventually("the result should be a array", function() {
            expect(underscore.isArray(this.result)).toEqual(true);
        });

        itEventually("the results should contain 1 item", function() {
            expect(this.result.length).toEqual(1);
        });

        itEventually("the result should only contain the function as a callback", function() {
            expect(this.result[0]).toEqual(this.testMethod);
        });
    });

    describe("when given a single dependency in a string and a function", function() {
        before(function() {
            this.dependency = "dep1";
            this.callback = function() { var foo = "bar"; };
            this.result = adapter(this.dependencies, this.callback);
        });

        itEventually("the result should be a array with the function as callback", function() {
            expect(underscore.isArray(this.result)).toEqual(true);
        });

        itEventually("the results should contain 2 items", function() {
            expect(this.result.length).toEqual(2);
        });

        itEventually("the result should contain a single dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.testMethod);
        });

        itEventually("the result should contain the function as a callback as the last item", function() {
            expect(this.result[1]).toEqual(this.testMethod);
        });
    });
});