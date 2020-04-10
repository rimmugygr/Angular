// import {Result} from "./result";
var Scoreboard = /** @class */ (function () {
    function Scoreboard() {
        this.results = [];
    }
    Scoreboard.prototype.addResults = function (newResult) {
        this.results.push(newResult);
    };
    Scoreboard.prototype.updateScoreboard = function () {
        console.log(this.results);
        var output = "<h2>Scoreboard</h2>\n";
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var result = _a[_i];
            output += '<h4>\n' +
                result.playerName + " has socre " +
                result.score + "/" +
                result.problemCount + " for factor " +
                result.factor + '<h4>\n';
        }
        var scoresElement = document.getElementById('scores');
        scoresElement.innerHTML = output;
    };
    return Scoreboard;
}());
//# sourceMappingURL=scoreboard.js.map