"use strict"
const game = {
    gameBoard: [ 0, 1, 2,
                 3, 4, 5,
                 6, 7, 8],
    turn: "player",
    turnCount: 0,
    updateGameBoard: function(square, playerOrOpponent) {
        if(playerOrOpponent === "player") {
            this.gameBoard.splice([square.target.dataset.value], 1, "x");
            console.log(this.gameBoard);
        }
        else {
            this.gameBoard.splice([square.target.dataset.value], 1, "0");
        }
        this.checkIfWinner(this.gameBoard);
    },
    checkIfWinner: function(array) {
        if(array[0] === array[1] && array[1] === array[2]) {
            addScore(array[0]);
        }
        else if(array[3] === array[4] && array[4] === array[5]) {
            addScore(array[3]);
        }
        else if(array[6] === array[7] && array[7] === array[8]) {
            addScore(array[6]);
        }
        else if(array[0] === array[3] && array[3] === array[6]) {
            addScore(array[0]);
        }
        else if(array[1] === array[4] && array[4] === array[7]) {
            addScore(array[1]);
        }
        else if(array[0] === array[4] && array[4] === array[8]) {
            addScore(array[0]);
        }
        else if(array[2] === array[4] && array[4] === array[6]) {
            addScore(array[2]);
        }
        else if(array.every((element) => {element === String})) {
            console.log("New Round")
            this.newRound();
        }
        else {
            console.log(opponent);
            this.nextTurn();
        }
        function addScore(mark) {
            if(mark === "x") {
                player.score++;
                console.log(player.score);
            }
            else {
                opponent.score++;
                console.log(opponent.score);
            }
        }
    },
    nextTurn: function() {
        console.log(opponent.name);
        if(this.turn === "player" && opponent.name === "computer") {
            this.turn = opponent.name;
            opponent.turn();
        }
        else if (this.turn === "player" && opponent.name === "secondPlayer"){
            this.turn = "player";
            this.turn = opponent.name;
            console.log("yes");
        }
        else {
            this.turn = "player";
        }
    },
    newRound: function() {

    }
};

const player = {
    turn: function(event) {
        function addMark (square) {
            const mark = document.createElement("span");
            mark.id = "mark";
            mark.innerHTML = "X";
            square.target.appendChild(mark);
        }
        addMark(event);
        game.updateGameBoard(event, "player");
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
            name: "computer",
            score: 0,
            turn: function() {
                function addMark(square) {
                    
                }
                function computerAI(array) {
                    const mark = "0";
                    function checkHorizontalMatches() {
                        for(let i = 0; i < array.length; i++) {
                            for(let j = 0; j < array.length; j++) {
                                if(array[i] === mark && array[j + 1] === mark && array[j+ 2] === Number) {
                                    addMark(array[j + 2]);
                                }
                            }
                        } 
                    }
                    function selectRandomSquare() {
                    
                    }

                }
               this.turn.computerAI(game.gameBoard);
            }
        }
    }
    else {
        return {
            name: "secondPlayer",
            score: 0,
            turn: function(event) {
                function addMark (square) {
                    const mark = document.createElement("span");
                    mark.id = "mark";
                    mark.innerHTML = "0";
                    console.log(square.target);
                    square.target.appendChild(mark);
                }
                addMark(event);
                game.updateGameBoard(event, "secondPlayer");
            }

        }
    }
}

const boardSquare = document.getElementsByClassName("board-square");

for(let i = 0; i < boardSquare.length; i++) {
    boardSquare[i].addEventListener("click", (event) => {addMark(event) });
}

function addMark (event) {
    console.log(event.target)
    if(game.turn === "player" && event.target.childNodes.length ===  0) {
        player.turn(event);
    }
    else if(game.turn === "secondPlayer" && event.target.childNodes.length ===  0) {
        opponent.turn(event);
    }
}
