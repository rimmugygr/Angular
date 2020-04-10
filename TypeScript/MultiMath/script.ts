// import { Player } from "./player";
// import { Game } from "./game";
// import * as Helpers from './utility'
// import {First,Second,ClassData} from "./classdata";
// import {Data} from "./data";

let newGame: Game;
// click handler to start game
document.getElementById('startGame')!.addEventListener('click',() => {
    const player: Player = new Player();
    player.name = Utility.getInputValue('playerName');

    const problemCount: number = Number(Utility.getInputValue('problemCount'));
    const factor: number = Number(Utility.getInputValue('factor'));

    newGame = new Game(player, problemCount, factor);
    newGame.displayGame();
} );
//click handel to end game and calculate score
document.getElementById('calculate')!.addEventListener('click', () => {
    newGame.calculateScore();
} );

//interfaces
let myData:Data = {
    name: "aaaa",
    formatName: () =>  name
    // formatName: function () {
    //     return name;
    // }
};
console.log(myData);

//class implements interfaces
let myClassData:ClassData = new ClassData();
myClassData.name = "xxx";
myClassData.secret = "yyy";
console.log(myClassData);

//class with extends and constructor
let myFirst:First = new First();
let mySecond:Second = new Second('myReadOnlyText');
console.log(myFirst);
console.log(mySecond);
console.log(First.staticField)

