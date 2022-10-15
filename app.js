// import { win_data } from "./scripts/winnes-data";
const myObj = {
  currentPlayer: "X",
  gameState: ["", "", "", "", "", "", "", "", ""],
  WINNINGS: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  WINNINGS4: [
    [1, 2, 3],
    [2, 3, 4],
    [5, 6, 7],
    [6, 7, 8],
    [9, 10, 11],
    [10, 11, 12],
    [13, 14, 15],
    [14, 15, 16],
    [1, 5, 9],
    [5, 9, 3],
    [2, 6, 10],
    [6, 10, 14],
    [3, 7, 11],
    [7, 11, 15],
    [4, 8, 12],
    [8, 12, 16],
    [1, 6, 11],
    [3, 6, 9],
    [2, 7, 12],
    [4, 7, 10],
    [5, 10, 15],
    [7, 10, 13],
    [8, 11, 14],
    [6, 11, 16],
  ],
  gameActive: true,
  winner: false,
  tie: false,
  size: 3,
};

const hidden = document.querySelectorAll(".hidden");
const gameGrid = document.querySelector(".game-container");
var gameArr = myObj.gameState;

function validateBoard() {
  if (myObj.size == 3) {
    var winnings_array = [...myObj.WINNINGS];
  } else if (myObj.size == 4) {
    winnings_array = [...myObj.WINNINGS4];
  }
  for (let i = 0; i < winnings_array.length; i++) {
    let row = winnings_array[i];
    let position1 = row[0];
    let position2 = row[1];
    let position3 = row[2];
    if (
      gameArr[position1 - 1] == myObj.currentPlayer &&
      gameArr[position2 - 1] == myObj.currentPlayer &&
      gameArr[position3 - 1] == myObj.currentPlayer
    ) {
      console.log("winner");
      myObj.gameActive = false;
      displayMessage();
      changePlayer();
      myObj.winner = true;
      return;
    }
  }
  myObj.tie = !gameArr.includes("");
  if (myObj.tie) {
    myObj.gameActive = false;
    displayMessage();
  }
}

function displayMessage() {
  let h4 = document.querySelector("h4");
  if (myObj.gameActive) {
    h4.innerText = `${myObj.currentPlayer}'s turn!`;
    h4.style.fontSize = "19.2px";
  } else if (myObj.winner) {
    h4.innerText = `${myObj.currentPlayer} won!!!`;
    h4.style.fontSize = "60px";
  } else {
    h4.innerText = `its a tie!`;
    h4.style.fontSize = "60px";
  }
}
function restartGame() {
  // setting the game state array according to size of the board choosen
  if (myObj.size == 3) {
    gameArr = new Array(9).fill("");
    hidden.forEach((cell) => (cell.style.display = "none"));
    gameGrid.style.gridTemplateColumns = "repeat(3, auto)";
  } else {
    // grid-template-columns: repeat(3, auto);
    gameArr = new Array(16).fill("");
    console.log(gameArr);
    hidden.forEach((cell) => (cell.style.display = "block"));
    gameGrid.style.gridTemplateColumns = "repeat(4, auto)";
  }
  const cells = document.querySelectorAll(".game-cell");
  for (let cell of cells) {
    cell.innerText = "";
  }
  myObj.gameActive = true;
  myObj.winner = false;
  myObj.tie = false;
  displayMessage();
}

function changePlayer() {
  myObj.currentPlayer = myObj.currentPlayer == "X" ? "O" : "X";
  displayMessage();
}

function handleClicks(event) {
  event.target.id == "restart" && restartGame();
  if (event.target.id === "btn3") {
    myObj.size = 3;
    restartGame();
  }
  if (event.target.id === "btn4") {
    myObj.size = 4;
    restartGame();
  }
  if (!myObj.gameActive) {
    return;
  }
  if (event.target.innerText == "") {
    event.target.innerText = myObj.currentPlayer;
    event.target.style.fontSize = "60px";
    if (myObj.currentPlayer == "X") {
      event.target.style.color = "mediumspringgreen";
    } else {
      event.target.style.color = "mediumslateblue";
    }
    gameArr[event.target.id - 1] = myObj.currentPlayer;
    console.log(gameArr);
    validateBoard();
    changePlayer();
  }
}

function createEvents() {
  const clicks = document
    .querySelectorAll(".game-cell")
    .forEach((cell) => cell.addEventListener("click", handleClicks));
  const btns = document
    .querySelectorAll("button")
    .forEach((btn) => btn.addEventListener("click", handleClicks));
}

displayMessage();
createEvents();
