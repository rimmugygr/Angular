// import { Player } from "./player";
// import { Game } from "./game";
// import * as Helpers from './utility'
// import {First,Second,ClassData} from "./classdata";
// import {Data} from "./data";
var newGame;
// click handler to start game
document.getElementById('startGame').addEventListener('click', function () {
    var player = new Player();
    player.name = Utility.getInputValue('playerName');
    var problemCount = Number(Utility.getInputValue('problemCount'));
    var factor = Number(Utility.getInputValue('factor'));
    newGame = new Game(player, problemCount, factor);
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
var myClassData = new ClassData();
myClassData.name = "xxx";
myClassData.secret = "yyy";
console.log(myClassData);
//class with extends and constructor
var myFirst = new First();
var mySecond = new Second('myReadOnlyText');
console.log(myFirst);
console.log(mySecond);
console.log(First.staticField);
//# sourceMappingURL=script.js.map