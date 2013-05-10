var buster, adapter;
if (typeof require === "function" && typeof module === "object") {
    buster = require("buster");
    adapter = require("../index");
} else {
    buster = window.buster;
    adapter = window.adapter;
}

var spec = describe("mapper", function() {
    "use strict";
    describe("when given a property selector", function() {

        it("should retrieve the value of property", function() {
            var result = adapter.mapper("prop2", { "prop1": "val1", "prop2": "val2", "prop3": "val3" });
            expect(result).toEqual("val2");
        });

    });

    describe("when given a sub property selector", function() {

        it("should retrieve the value of property", function() {
            var result = adapter.mapper("prop2.subprop2", {
                "prop1": { "subprop1": "val1.1", "subprop2": "val1.2", "subprop3": "val1.3" },
                "prop2": { "subprop1": "val2.1", "subprop2": "val2.2", "subprop3": "val2.3" },
                "prop3": { "subprop1": "val3.1", "subprop2": "val3.2", "subprop3": "val3.3" }
            });
            expect(result).toEqual("val2.2");
        });

    });

    describe("when given a array selector", function() {

        it("should retrieve the value of property", function() {
            var result = adapter.mapper("prop2[1]", {
                "prop1": [ "val1.1", "val1.2", "val1.3" ],
                "prop2": [ "val2.1", "val2.2", "val2.3" ],
                "prop3": [ "val3.1", "val3.2", "val3.3" ]
            });
            expect(result).toEqual("val2.2");
        });

    });
});