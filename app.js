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
  gameActive: true,
};

function displayMessage() {
  document.querySelector(
    "h4"
  ).innerText = `${myObj.currentPlayer}, its your turn!`;
}

function restartGame() {
  console.log("restart");
}

function changePlayer() {
  myObj.currentPlayer = myObj.currentPlayer == "X" ? "O" : "X";
  displayMessage();
}

function handleClicks(event) {
  event.target.id === "restart" && restartGame();
  if (event.target.innerText == "") {
    event.target.innerText = myObj.currentPlayer;
    myObj.gameState[event.target.id - 1] = myObj.currentPlayer;
    //validate board
    changePlayer();
  }
}

function createEvents() {
  const clicks = document
    .querySelectorAll(".game-cell")
    .forEach((cell) => cell.addEventListener("click", handleClicks));
  document.querySelector("button").addEventListener("click", handleClicks);
}

displayMessage();
createEvents();
