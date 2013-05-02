var buster = require("buster");
var underscore = require("underscore");

var adapter = require("../index");

buster.spec.expose();

var spec = describe("async-auto-adapter", function(){
    "use strict";

    describe("when given a single function", function() {
        before(function() {
            this.callback = function() { var foo = "bar"; };
            this.result = adapter(this.callback);
        });

        it("the result should be a array", function() {
            expect(underscore.isArray(this.result)).toEqual(true);
        });

        it("the results should contain 1 item", function() {
            expect(this.result.length).toEqual(1);
        });

        it("the result should only contain the function as a callback", function() {
            expect(this.result[0]).toEqual(this.callback);
        });
    });

    describe("when given a single dependency in a string and a function", function() {
        before(function() {
            this.dependency = "dep1";
            this.callback = function() { var foo = "bar"; };
            this.result = adapter(this.dependency, this.callback);
        });

        itEventually("the result should be a array", function() {
            expect(underscore.isArray(this.result)).toEqual(true);
        });

        itEventually("the results should contain 2 items", function() {
            expect(this.result.length).toEqual(2);
        });

        itEventually("the result should contain a single dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency);
        });

        itEventually("the result should contain the function as a callback as the last item", function() {
            expect(this.result[1]).toEqual(this.callback);
        });
    });

    describe("when given a two dependencies in a string and a function", function() {
        before(function() {
            this.dependency1 = "dep1";
            this.dependency2 = "dep2";
            this.dependencies = "dep1 dep2";
            this.callback = function() { var foo = "bar"; };
            this.result = adapter(this.dependencies, this.callback);
        });

        itEventually("the result should be a array with the function as callback", function() {
            expect(underscore.isArray(this.result)).toEqual(true);
        });

        itEventually("the results should contain 3 items", function() {
            expect(this.result.length).toEqual(2);
        });

        itEventually("the result should contain the first dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency1);
        });

        itEventually("the result should contain the second dependency as the second item", function() {
            expect(this.result[1]).toEqual(this.dependency2);
        });

        itEventually("the result should contain the function as a callback as the last item", function() {
            expect(this.result[2]).toEqual(this.callback);
        });
    });
});