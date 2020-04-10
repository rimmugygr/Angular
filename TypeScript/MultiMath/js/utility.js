var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.getInputValue = function (elementID) {
        var inputElement = document.getElementById(elementID);
        return inputElement.value;
    };
    Utility.logger = function (message) {
        console.log(message);
    };
    return Utility;
}());
// export {getInputValue as getValue ,logger}
//# sourceMappingURL=utility.js.map