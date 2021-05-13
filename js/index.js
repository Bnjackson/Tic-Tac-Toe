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
        }
        else if(playerOrOpponent === "secondPlayer"){
            this.gameBoard.splice([square.target.dataset.value], 1, "0");
        }
        else {
            this.gameBoard.splice(square, 1, "0");
        }
        this.checkIfWinner(this.gameBoard);
    },
    checkIfWinner: function(arr) {
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
        };
        if(arr[0] === arr[1] && arr[1] === arr[2]) {
            addScore(arr[0]);
        }
        else if(arr[3] === arr[4] && arr[4] === arr[5]) {
            addScore(arr[3]);
        }
        else if(arr[6] === arr[7] && arr[7] === arr[8]) {
            addScore(arr[6]);
        }
        else if(arr[0] === arr[3] && arr[3] === arr[6]) {
            addScore(arr[0]);
        }
        else if(arr[1] === arr[4] && arr[4] === arr[7]) {
            addScore(arr[1]);
        }
        else if(arr[2] === arr[5] && arr[2] === arr[8]) {
            addScore(arr[2])
        }
        else if(arr[0] === arr[4] && arr[4] === arr[8]) {
            addScore(arr[0]);
        }
        else if(arr[2] === arr[4] && arr[4] === arr[6]) {
            addScore(arr[2]);
        }
        else if(arr.every((element) => {return typeof element === "string"})) {
            this.newRound();
        }
        else {
            this.nextTurn();
        }
    },
    nextTurn: function() {
        if(this.turn === "player" && opponent.name === "computer") {
            this.turn = opponent.name;
            opponent.turn();
        }
        else if (this.turn === "player" && opponent.name === "secondPlayer"){
            this.turn = opponent.name;
            listenForBoardEvent();
        }
        else {
            this.turn = "player";
            listenForBoardEvent();
        }
    },
    newRound: function() {
        for(let i = 0; i < boardSquare.length; i++) {
            boardSquare[i].removeEventListener("click", addMark, false);
        }
        const clearBoard = () => {
            for(let i = 0; i < boardSquare.length; i++) {
                if(boardSquare[i].childNodes.length === 1) {
                    boardSquare[i].removeChild(boardSquare[i].firstChild);
                }
                this.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            }
            this.nextTurn();
        }
        setTimeout(() => clearBoard(), 1000);
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
                    game.updateGameBoard(square, "computer");
                }
                function computerAI(board) {
                    const emptySquares = [];
                    function checkForwinningMove() {
                        for(let i = 0; i < board.length; i+=3) {
                            if(board[i] === board[i + 1] || board[i] === board[i + 2] || board[i + 1] === board[i + 2]) {
                                if(typeof board[i] === "number" && board[i + 1] === "0" && board[i + 2] === "0") {
                                    return board[i];
                                }
                                else if(typeof board[i + 1] === "number" && board[i] === "0" && board[i + 2] === "0") {
                                    return board[i + 1];
                                }
                                else if(typeof board[i + 2] === "number" && board[i] === "0" && board[i + 1] === "0") {
                                    return board[i + 2];
                                }
                            }
                        }
                        for(let i = 0; i < board.length; i++) {
                            if(board[i] === board[i + 3] || board[i] === board[i + 6] || board[i + 3] === board[i + 6]) {
                                if(typeof board[i] === "number" && board[i + 3] === "0" && board[i + 6] === "0") {
                                    return board[i];
                                }
                                else if(typeof board[i + 3] === "number" && board[i] === "0" && board[i + 6] === "0") {
                                    return board[i + 3];
                                }
                                else if(typeof board[i + 6] === "number" && board[i] === "0" && board[i + 3] === "0") {
                                    return board[i + 6];
                                }
                            }
                        }
                        if(board[2] === board[4] || board[2] === board[6] || board[4] === board[6]) {
                            if(typeof board[2] === "number" && board[4] === "0" && board[6] === "0"){
                                return board[2];
                            }
                            else if(typeof board[4] === "number" && board[2] === "0" && board[6] === "0") {
                                return board[4];
                            }
                            else if(typeof board[6] === "number" && board[2] === "0" && board[4] === "0") {
                                return board[6];
                            }
                        }
                        else if(board[0] === board[4] || board[0] === board[8] || board[4] === board[8]) {
                            if(typeof board[0] === "number" && board[4] === "0" && board[8] === "0"){
                                return board[0];
                            }
                            else if(typeof board[4] === "number" && board[0] === "0" && board[8] === "0") {
                                return board[4];
                            }
                            else if(typeof board[8] === "number" && board[4] === "0" && board[0] === "0") {
                                return board[8];
                            }
                        } 
                        return false;
                    }
                    function selectRandomSquare() {
                        for(let i = 0; i < board.length; i++) {
                            if(board[i] !== "x" && board[i] !== "0") {
                                emptySquares.push(board[i]);
                            }
                        }
                        const randomNumber = Math.floor(Math.random() * emptySquares.length);
                        setTimeout(() => addMark(board[emptySquares[randomNumber]]), 1000);
                    }
                    const winningMove = checkForwinningMove();
                    winningMove ? addMark(winningMove): selectRandomSquare();

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