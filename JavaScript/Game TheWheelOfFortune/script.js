var password = "Hell on World";
password = password.toUpperCase();
var letters = new Array(35);
letters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I",
    "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś",
    "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];
var hiddenPassword = "";
var playerLife = 9;

function getHiddenPassword() {
    for (i=0; i<password.length; i++){
        if (password.charAt(i)==" ") hiddenPassword = hiddenPassword + " ";
        else hiddenPassword = hiddenPassword + "-";
    }
}
function viewPasswordOnBoard(){
    document.getElementById("board").innerHTML=hiddenPassword;
}
function viewLetterOnAlphabet(){
    var divAlphabetHtml="";
    for (i=0; i<=34;i++){
        divAlphabetHtml += '<div id="let'+i+'" onclick="checkLetter('+i+')" class="letter">'+letters[i]+'</div>';
        if ((i+1)%7==0)divAlphabetHtml += '<div style="clear: both"></div>';<!--div in new line-->
    }
    document.getElementById("alphabet").innerHTML = divAlphabetHtml;
}
String.prototype.setChar = function (number,char) {
    if (number>=this.length) return this.toString;
    else return this.substr(0,number)+char+this.substr(number+1);
}
function checkLetter(number){
    var letterInPassword = false;
    for (i = 0; i < password.length ; i++) {
        if(password.charAt(i)==letters[number]){
            hiddenPassword = hiddenPassword.setChar(i,letters[number]);
            letterInPassword = true;
        }
    }
    if (letterInPassword == true){
        document.getElementById("let"+number).style.background = "#003300";
        document.getElementById("let"+number).style.cursor = "default";
        document.getElementById("let"+number).style.color = "#00C000";
        viewPasswordOnBoard();
    } else {
        document.getElementById("let"+number).style.background = "#330000";
        document.getElementById("let"+number).style.cursor = "default";
        document.getElementById("let"+number).style.color = "#C00000";
        document.getElementById("let"+number).setAttribute("onclick",";");

        document.getElementById("lif"+playerLife).style.background = "black";
        document.getElementById("lif"+playerLife).style.borderColor = "black";
        playerLife--;
    }
    if(password==hiddenPassword){
        document.getElementById("alphabet").innerHTML = "You Win :)<br/><br/> " +
            '<span class="reset" onclick="location.reload()">Again</span>'
    }
    if(playerLife<1){
        document.getElementById("alphabet").innerHTML = "You Lose :(<br/><br/> " +
            '<span class="reset" onclick="location.reload()">Again</span>'
    }

}

function viewLife(playerLive){
    var divPlayerLifeHtml="";
    for (i=1; i<=9;i++){
        divPlayerLifeHtml += '<div id="lif'+i+'" class="playerLife">Life '+i+'</div>';
        if (i%3==0)divPlayerLifeHtml += '<div style="clear: both"></div>';<!--div in new line-->
    }
    document.getElementById("life").innerHTML = divPlayerLifeHtml;
}
window.onload = start;
function start() {
    viewLetterOnAlphabet();
    getHiddenPassword();
    viewLife();
    viewPasswordOnBoard();
}














