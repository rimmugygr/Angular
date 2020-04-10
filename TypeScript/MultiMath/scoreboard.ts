// import {Result} from "./result";

class Scoreboard {
    private results: Result[] = [];

    addResults(newResult: Result): void {
        this.results.push(newResult);
    }

    updateScoreboard():void {
        console.log(this.results);
        let output: string = "<h2>Scoreboard</h2>\n";
        for (let result of this.results){
            output += '<h4>\n'+
                result.playerName+" has socre "+
                result.score+ "/"+
                result.problemCount+" for factor "+
                result.factor+'<h4>\n';
        }
        const scoresElement: HTMLElement | null = document.getElementById('scores');
        scoresElement!.innerHTML = output;
    }
}