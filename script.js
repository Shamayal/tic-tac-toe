const squares = document.querySelectorAll(".square");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const gameStatus = document.getElementById("gameStatus");
let gameActive = true;

const resetButton = document.getElementById("resetButton");

let boardState = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let scores = {
  X: 0,
  O: 0,
};

const winPatterns = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// function to add marks on squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    console.log(`Square ${index + 1} clicked by ${currentPlayer}`);
    if (currentPlayer === "X") {
      square.innerText = "X";
      boardState[index] = "X";
      console.log(boardState);
      changePlayer();
    } else {
      square.innerText = "O";
      boardState[index] = "O";
      console.log(boardState);
      changePlayer();
    }
  });
});

// function to add win/tie

// function to update score

// Change Players
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset Game
resetButton.addEventListener("click", () => {
  console.log("Reset Button Clicked!");

  boardState = ["", "", "", "", "", "", "", "", ""];
  console.log(boardState);

  squares.forEach((square) => {
    square.innerText = "";
  });

  currentPlayer = "X";
  gameStatus.textContent = "Player X's Turn";

  scores.X = 0;
  scores.O = 0;
  scoreX.textContent = "0";
  scoreO.textContent = "0";

  gameActive = true;
});
