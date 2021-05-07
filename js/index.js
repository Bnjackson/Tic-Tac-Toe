"use strict"
const game = {
    gameBoard: [1,2,3,4,5,6,7,8,9],
    updateGameBoard: function() {

    },
    turn: "player",
    checkIfWon: function() {

    },
    newRound: function() {

    }
};

const player = {
    playerTurn: function() {

    },
    score: 0,
};

let opponent;

document.getElementById("computer").addEventListener("click", function(){opponentChoice("computer")});
document.getElementById("secondPlayer").addEventListener("click", function(){opponentChoice("secondPlayer")});

function opponentChoice(playerChoice) {
    document.getElementById("opponentScreen").style.display = "none";
    document.getElementById("game").style.display = "flex";
    document.getElementById("message").style.display = "block";
    playerChoice === "computer"? document.getElementById("player2Icon").src = "/resources/svg/Computer.svg": document.getElementById("player2Icon").src = "/resources/svg/Player.svg";
    opponent = OpponentConstructor(playerChoice);
}

function OpponentConstructor(choice) {
    if(choice === "computer") {
        return {
            score: 0,
            turn: function() {

            }
        }
    }
    else {
        return {
            score: 0,
            turn: function() {

            }

        }
    }
}

