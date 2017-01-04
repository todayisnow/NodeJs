"use strict";
var assert = require('assert');
function Test1() {
    assert.ok(true, "This shouldn't fail");
}
exports.Test1 = Test1;
function Test2() {
    assert.ok(1 === 1, "This shouldn't fail");
    assert.ok(false, "This should fail");
}
exports.Test2 = Test2;
//# sourceMappingURL=UnitTest1.js.map