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
  winner: false,
  tie: false,
};

function validateBoard() {
  for (let i = 0; i < myObj.WINNINGS.length; i++) {
    let row = myObj.WINNINGS[i];
    let position1 = row[0];
    let position2 = row[1];
    let position3 = row[2];
    if (
      myObj.gameState[position1 - 1] == myObj.currentPlayer &&
      myObj.gameState[position2 - 1] == myObj.currentPlayer &&
      myObj.gameState[position3 - 1] == myObj.currentPlayer
    ) {
      console.log("winner");
      myObj.gameActive = false;
      displayMessage();
      changePlayer();
      myObj.winner = true;
      return;
    }
  }
  myObj.tie = !myObj.gameState.includes("");
  console.log(myObj.tie);
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
    h4.innerText = `its a tie!!!`;
    h4.style.fontSize = "60px";
  }
}
function restartGame() {
  for (let i = 0; i < myObj.gameState.length; i++) {
    myObj.gameState[i] = "";
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
  event.target.id === "restart" && restartGame();
  if (!myObj.gameActive) {
    return;
  }
  if (event.target.innerText == "") {
    event.target.innerText = myObj.currentPlayer;
    event.target.style.fontSize = "60px";
    if (myObj.currentPlayer == "X") {
      event.target.style.color = "green";
    } else {
      event.target.style.color = "purple";
    }
    myObj.gameState[event.target.id - 1] = myObj.currentPlayer;
    validateBoard();
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
