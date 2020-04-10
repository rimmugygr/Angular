// import {getValue} from "./utility";
// import {Result} from "./result";
// import {Player} from "./player";
// import {Scoreboard as ResultPanel } from "./scoreboard";
var Game = /** @class */ (function () {
    function Game(player, problemCount, factor) {
        this.player = player;
        this.problemCount = problemCount;
        this.factor = factor;
        this.scoreboard = new Scoreboard();
    }
    Game.prototype.displayGame = function () {
        //current game
        var gameForm = '';
        for (var i = 1; i <= this.problemCount; i++) {
            gameForm += '<div class="form-group">';
            gameForm += '<label for="answer' + String(i) + '" >';
            gameForm += String(this.factor) + ' x ' + String(i) + ' = </label>';
            gameForm += '<div class="col-sm-1"><input type="text"  id="answer' + String(i) + '" size="5"/></div>';
            gameForm += '</div>';
        }
        //add game to page
        var gameElement = document.getElementById('game');
        gameElement.innerHTML = gameForm;
        //enable to calculate score button
        document.getElementById('calculate').removeAttribute('disabled');
    };
    Game.prototype.calculateScore = function () {
        var score = 0;
        //loop through the answer and calculate correct number
        for (var i = 1; i <= this.problemCount; i++) {
            var answer = Number(Utility.getInputValue('answer' + i));
            if (i * this.factor === answer) {
                score++;
            }
        }
        //create new result object to the scoreboard
        var result = {
            playerName: this.player.name,
            score: score,
            problemCount: this.problemCount,
            factor: this.factor
        };
        // add result to tab and update view of scoreboard
        this.scoreboard.addResults(result);
        this.scoreboard.updateScoreboard();
        //disable calculate score
        document.getElementById('calculate').setAttribute('disabled', 'true');
    };
    return Game;
}());
//# sourceMappingURL=game.js.map