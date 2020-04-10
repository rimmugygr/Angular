"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var game_1 = require("./game");
var Helpers = require("./utility");
var classdata_1 = require("./classdata");
var newGame;
// click handler to start game
document.getElementById('startGame').addEventListener('click', function () {
    var player = new player_1.Player();
    player.name = Helpers.getValue('playerName');
    var problemCount = Number(Helpers.getValue('problemCount'));
    var factor = Number(Helpers.getValue('factor'));
    newGame = new game_1.Game(player, problemCount, factor);
    newGame.displayGame();
});
//click handel to end game and calculate score
document.getElementById('calculate').addEventListener('click', function () {
    newGame.calculateScore();
});
//interfaces
var myData = {
    name: "aaaa",
    formatName: function () { return name; }
    // formatName: function () {
    //     return name;
    // }
};
console.log(myData);
//class implements interfaces
var myClassData = new classdata_1.ClassData();
myClassData.name = "xxx";
myClassData.secret = "yyy";
console.log(myClassData);
//class with extends and constructor
var myFirst = new classdata_1.First();
var mySecond = new classdata_1.Second('myReadOnlyText');
console.log(myFirst);
console.log(mySecond);
console.log(classdata_1.First.staticField);
//# sourceMappingURL=script.js.map