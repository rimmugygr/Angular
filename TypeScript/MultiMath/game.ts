// import {getValue} from "./utility";
// import {Result} from "./result";
// import {Player} from "./player";
// import {Scoreboard as ResultPanel } from "./scoreboard";

class Game {
    private scoreboard: Scoreboard = new Scoreboard();

    constructor(public player: Player,public problemCount: number,public factor: number) {
    }

    displayGame(): void {
        //current game
        let gameForm: string = '';
        for (let i=1; i<=this.problemCount; i++){
            gameForm += '<div class="form-group">';
            gameForm += '<label for="answer'+ String(i) +'" >';
            gameForm += String(this.factor)+' x '+ String(i) +' = </label>';
            gameForm += '<div class="col-sm-1"><input type="text"  id="answer'+ String(i) +'" size="5"/></div>';
            gameForm += '</div>';
        }
        //add game to page
        const gameElement:HTMLElement | null = document.getElementById('game');
        gameElement!.innerHTML = gameForm;
        //enable to calculate score button
        document.getElementById('calculate')!.removeAttribute('disabled');
    }

    calculateScore(): void {
        let score: number = 0;

        //loop through the answer and calculate correct number
        for (let i=1; i<=this.problemCount; i++){
            const answer: number = Number(Utility.getInputValue('answer'+i));
            if (i * this.factor === answer){
                score++;
            }
        }

        //create new result object to the scoreboard
        const result:Result = {
            playerName: this.player.name,
            score: score,
            problemCount: this.problemCount,
            factor: this.factor
        };

        // add result to tab and update view of scoreboard
        this.scoreboard.addResults(result);
        this.scoreboard.updateScoreboard();

        //disable calculate score
        document.getElementById('calculate')!.setAttribute('disabled','true');
    }

}