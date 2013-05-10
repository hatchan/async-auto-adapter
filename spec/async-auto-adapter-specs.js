var buster, adapter;
if (typeof require === "function" && typeof module === "object") {
    buster = require("buster");
    adapter = require("../index");
} else {
    buster = window.buster;
    adapter = window.adapter;
}

buster.spec.expose();

var spec = describe("async-auto-adapter", function() {
    "use strict";

    describe("when given a single function", function() {
        before(function() {
            this.funcImpl = this.spy();
            this.result = adapter(this.funcImpl);
        });

        it("the result should be a array", function() {
            expect(this.result).toBeArray();
        });

        it("the results should contain 1 item", function() {
            expect(this.result.length).toEqual(1);
        });

        it("the result should only contain a function", function() {
            expect(this.result[0]).toBeFunction();
        });

        it("this.funcImpl should be called with 1 parameter when calling the method in result", function() {
            var callbackMethod = function() { console.log("callbackMethod"); };
            this.result[0](callbackMethod, {});

            expect(this.funcImpl).toHaveBeenCalledOnce();
            expect(this.funcImpl).toHaveBeenCalledWith(callbackMethod);
        });
    });

    describe("when given a single dependency in a string and a function", function() {
        before(function() {
            this.dependency = "dep1";
            this.funcImpl = this.spy();
            this.result = adapter(this.dependency, this.funcImpl);
        });

        it("the result should be a array", function() {
            expect(this.result).toBeArray();
        });

        it("the results should contain 2 items", function() {
            expect(this.result.length).toEqual(2);
        });

        it("the result should contain a single dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency);
        });

        it("the result should contain a function as the last item", function() {
            expect(this.result[1]).toBeFunction();
        });

        it("this.funcImpl should be called with 1 parameter when calling the method in result", function() {
            var callbackMethod = function() { console.log("callbackMethod"); };
            this.result[1](callbackMethod, {});

            expect(this.funcImpl).toHaveBeenCalledOnce();
            expect(this.funcImpl).toHaveBeenCalledWithExactly(callbackMethod);
        });
    });

    describe("when given a two dependencies in a string and a function", function() {
        before(function() {
            this.dependency1 = "dep1";
            this.dependency2 = "dep2";
            this.dependencies = "dep1 dep2";
            this.funcImpl = this.spy();
            this.result = adapter(this.dependencies, this.funcImpl);
        });

        it("the result should be a array", function() {
            expect(this.result).toBeArray();
        });

        it("the results should contain 3 items", function() {
            expect(this.result.length).toEqual(3);
        });

        it("the result should contain the first dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency1);
        });

        it("the result should contain the second dependency as the second item", function() {
            expect(this.result[1]).toEqual(this.dependency2);
        });

        it("the result should contain a function as the last item", function() {
            expect(this.result[2]).toBeFunction();
        });

        it("this.funcImpl should be called with 1 parameter when calling the method in result", function() {
            var callbackMethod = function() { console.log("callbackMethod"); };
            this.result[2](callbackMethod, {});

            expect(this.funcImpl).toHaveBeenCalledOnce();
            expect(this.funcImpl).toHaveBeenCalledWithExactly(callbackMethod);
        });
    });

    describe("when given a two dependencies in a string, a single map and a function", function() {
        before(function() {
            this.dependency1 = "dep1";
            this.dependency2 = "dep2";
            this.dependencies = "dep1 dep2";
            this.map = "dep1";
            this.funcImpl = this.spy();
            this.result = adapter(this.dependencies, this.map, this.funcImpl);
        });

        it("the result should be a array", function() {
            expect(this.result).toBeArray();
        });

        it("the results should contain 3 items", function() {
            expect(this.result.length).toEqual(3);
        });

        it("the result should contain the first dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency1);
        });

        it("the result should contain the second dependency as the second item", function() {
            expect(this.result[1]).toEqual(this.dependency2);
        });

        it("the result should contain a function as the last item", function() {
            expect(this.result[2]).toBeFunction();
        });

        it("this.funcImpl should be called with 1 parameter when calling the method in result", function() {
            var dep1Value = "dep1Value";
            var dep2Value = "dep2Value";
            var callbackMethod = function() { console.log("callbackMethod"); };
            this.result[2](callbackMethod, { "dep1": dep1Value, "dep2": dep2Value });

            expect(this.funcImpl).toHaveBeenCalledOnce();
            expect(this.funcImpl).toHaveBeenCalledWithExactly(dep1Value, callbackMethod);
        });
    });

    describe("when given a two dependencies in a string, a mutliple maps and a function", function() {
        before(function() {
            this.dependency1 = "dep1";
            this.dependency2 = "dep2";
            this.dependencies = "dep1 dep2";
            this.map = "dep2 dep1";
            this.funcImpl = this.spy();
            this.result = adapter(this.dependencies, this.map, this.funcImpl);
        });

        it("the result should be a array", function() {
            expect(this.result).toBeArray();
        });

        it("the results should contain 3 items", function() {
            expect(this.result.length).toEqual(3);
        });

        it("the result should contain the first dependency as the first item", function() {
            expect(this.result[0]).toEqual(this.dependency1);
        });

        it("the result should contain the second dependency as the second item", function() {
            expect(this.result[1]).toEqual(this.dependency2);
        });

        it("the result should contain a function as the last item", function() {
            expect(this.result[2]).toBeFunction();
        });

        it("this.funcImpl should be called with 1 parameter when calling the method in result", function() {
            var dep1Value = "dep1Value";
            var dep2Value = "dep2Value";
            var callbackMethod = function() { console.log("callbackMethod"); };
            this.result[2](callbackMethod, { "dep1": dep1Value, "dep2": dep2Value });

            expect(this.funcImpl).toHaveBeenCalledOnce();
            expect(this.funcImpl).toHaveBeenCalledWithExactly(dep2Value, dep1Value, callbackMethod);
        });
    });

});
