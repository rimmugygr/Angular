var cards = ["C","G","J","M","J","I","T","M","G","Y","X","C","X","T","Y","I"];
var pairLeft = 8;
var cardHandler = new Array(16);
var oneVisible = false;
var firstViisibleCard;
var turnCounter = 0;
var lock = false;

function revealCard(numberActulalCard) {
    var opacityValue = $("#c"+numberActulalCard).css("opacity");
    if (opacityValue != 0 && lock == false && numberActulalCard!=firstViisibleCard){
        lock = true;
        console.log(numberActulalCard);
        //jQuery
        // $("#c"+numberCard).css("color","olive");
        // $("#c"+numberCard).css("filter","brightness(100%)");
        // $("#c"+numberCard).css("border","4px solid olive");
        $("#c"+numberActulalCard).addClass("cardActivated");
        $("#c"+numberActulalCard).removeClass("card");
        if (oneVisible == false){
            oneVisible = true;
            firstViisibleCard = numberActulalCard;
            lock=false;
        } else {
            if(cards[numberActulalCard] == cards[firstViisibleCard] ){
                setTimeout(function () {hide2Cards(numberActulalCard,firstViisibleCard);},700);
            } else {
                setTimeout(function () {reveal2Cards(numberActulalCard,firstViisibleCard);},700);
            }
            oneVisible = false;
            turnCounter++;
            $(".score").html("Turn counter: "+turnCounter);
        }
    }
}
function hide2Cards(firstCard,secondCard) {
    $("#c"+firstCard).css("opacity","0");
    $("#c"+secondCard).css("opacity","0");
    lock=false;
    pairLeft--;
    if (pairLeft==0){
        $("#boardId").html("You win in "+ turnCounter + " turn");
    }
}
function reveal2Cards(firstCard,secondCard) {
    $("#c"+firstCard).addClass("card");
    $("#c"+firstCard).removeClass("cardActivated");
    $("#c"+secondCard).addClass("card");
    $("#c"+secondCard).removeClass("cardActivated");
    lock=false;
}


function initBoard() {
    var boardHtml = "";
    var letter = "";
    for (i=0; i<16; i++){
        letter = cards[i];
        boardHtml+="<div class=\"card\" id=\"c"+i+"\">"+letter+"</div>";
    }
    boardHtml+="<div class=\"score\" >Turn counter: 0</div>";
    document.getElementById("boardId").innerHTML = boardHtml;

    for (i=0; i<16; i++){
        cardHandler[i] = document.getElementById('c'+i);
        //js
        //cardHandler[i].addEventListener("click",function () { revealCard(cardNumber);});
        ////jQuery
        //$(cardHandler[i]).onclick("click",function () { revealCard(i);});
    }

    cardHandler[0].addEventListener("click",function () { revealCard(0); });
    cardHandler[1].addEventListener("click",function () { revealCard(1); });
    cardHandler[2].addEventListener("click",function () { revealCard(2); });
    cardHandler[3].addEventListener("click",function () { revealCard(3); });

    cardHandler[4].addEventListener("click",function () { revealCard(4); });
    cardHandler[5].addEventListener("click",function () { revealCard(5); });
    cardHandler[6].addEventListener("click",function () { revealCard(6); });
    cardHandler[7].addEventListener("click",function () { revealCard(7); });

    cardHandler[8].addEventListener("click",function () { revealCard(8); });
    cardHandler[9].addEventListener("click",function () { revealCard(9); });
    cardHandler[10].addEventListener("click",function () { revealCard(10); });
    cardHandler[11].addEventListener("click",function () { revealCard(11); });

    cardHandler[12].addEventListener("click",function () { revealCard(12); });
    cardHandler[13].addEventListener("click",function () { revealCard(13); });
    cardHandler[14].addEventListener("click",function () { revealCard(14); });
    cardHandler[15].addEventListener("click",function () { revealCard(15); });
}

window.onload = start;
function start() {
    initBoard();
}



