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
        else if(playerOrOpponent === "secondPlayer"){
            this.gameBoard.splice([square.target.dataset.value], 1, "0");
        }
        else {
            this.gameBoard.splice(square, 1, "0");
        }
        this.checkIfWinner(this.gameBoard);
    },
    checkIfWinner: function(array) {
        const addScore = mark => {
            if(mark === "x") {
                player.score++;
                document.getElementById("player1-score").innerHTML = player.score;
            }
            else {
                opponent.score++;
                document.getElementById("player2-score").innerHTML = opponent.score;
            }
            this.newRound();
        }
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
        else if(array[2] === array[5] && array[2] === array[8]) {
            addScore(array[2])
        }
        else if(array[0] === array[4] && array[4] === array[8]) {
            addScore(array[0]);
        }
        else if(array[2] === array[4] && array[4] === array[6]) {
            addScore(array[2]);
        }
        else if(array.every((element) => {return typeof element === "string"})) {
            console.log("New Round");
            this.newRound();
        }
        else {
            this.nextTurn();
        }
    },
    nextTurn: function() {
        console.log(this.turn);
        if(this.turn === "player" && opponent.name === "computer") {
            this.turn = opponent.name;
            opponent.turn();
        }
        else if (this.turn === "player" && opponent.name === "secondPlayer"){
            this.turn = opponent.name;
        }
        else {
            this.turn = "player";
        }
    },
    newRound: function() {
        for(let i = 0; i < boardSquare.length; i++) {
            console.log();
            boardSquare[i].removeEventListener("click", addMark, false);
        }
        const clearBoard = () => {
            for(let i = 0; i < boardSquare.length; i++) {
                if(boardSquare[i].childNodes.length === 1) {
                    boardSquare[i].removeChild(boardSquare[i].firstChild);
                }
                this.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            }
        }
        setTimeout(function() {clearBoard();}, 1300);
        console.log(this.turn);
        listenForBoardEvent();
        console.log(this.turn);
        if(this.turn === "computer") {

            opponent.turn();
        }
        
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
                    const mark = document.createElement("span");
                    mark.id = "mark";
                    mark.innerHTML = "0";
                    for(let i = 0; i < boardSquare.length; i++) {
                        if(boardSquare[i].dataset.value == square) {
                            boardSquare[i].appendChild(mark);
                        }
                    }
                    game.updateGameBoard(square, );
                }
                function computerAI(arr) {
                    function checkHorizontalMatches() {
                        for(let i = 0; i < arr.length; i++) {
                            for(let j = 0; j < arr.length; j++) {
                                if(arr[i] === mark && array[j + 1] === mark && arr[j + 2] === Number) {
                                    addMark(arr[j + 2]);
                                }
                            }
                        } 
                    }
                    function selectRandomSquare() {
                        const emptySpaces = [];
                        for(let i = 0; i < arr.length; i++) {
                            if(arr[i] !== "x" && arr[i] !== "0") {
                                emptySpaces.push(arr[i]);
                            }
                        }
                        const randomNumber = Math.floor(Math.random() * emptySpaces.length);
                        addMark(arr[emptySpaces[randomNumber]]);
                    }
                    selectRandomSquare();

                }
               computerAI(game.gameBoard);
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
                    square.target.appendChild(mark);
                }
                addMark(event);
                game.updateGameBoard(event, "secondPlayer");
            }

        }
    }
}

const boardSquare = document.getElementsByClassName("board-square");
function listenForBoardEvent() {
    for(let i = 0; i < boardSquare.length; i++) {
        boardSquare[i].addEventListener("click", addMark);
    }
}
listenForBoardEvent();

function addMark (event) {
    if(game.turn === "player" && event.target.childNodes.length ===  0) {
        player.turn(event);
    }
    else if(game.turn === "secondPlayer" && event.target.childNodes.length ===  0) {
        opponent.turn(event);
    }
}
