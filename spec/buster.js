var config = module.exports;

var config = exports; // Vanity

config["Browser tests"] = {
    environment: "browser",
    rootPath: "../",
    sources: ["lib/async-auto-adapter.js"],
    tests: [
        "spec/**/*-specs.js"
    ]
};

config["Server tests"] = {
    extends: "Browser tests",
    environment: "node"
};