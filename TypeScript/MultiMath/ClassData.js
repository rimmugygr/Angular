"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ClassData = /** @class */ (function () {
    function ClassData() {
    }
    Object.defineProperty(ClassData.prototype, "secret", {
        get: function () {
            return this._secret;
        },
        set: function (newSecret) {
            this._secret = newSecret;
        },
        enumerable: true,
        configurable: true
    });
    ClassData.prototype.formatName = function () {
        return this.name;
    };
    return ClassData;
}());
exports.ClassData = ClassData;
var First = /** @class */ (function () {
    function First() {
        First.staticField++;
        console.log("Creating First Class with " + First.staticField);
    }
    First.staticField = 0;
    return First;
}());
exports.First = First;
var Second = /** @class */ (function (_super) {
    __extends(Second, _super);
    function Second(text) {
        var _this = _super.call(this) || this;
        _this.readonlyString = text;
        return _this;
    }
    return Second;
}(First));
exports.Second = Second;
//# sourceMappingURL=ClassData.js.map