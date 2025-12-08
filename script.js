const squares = document.querySelectorAll(".square");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const gameStatus = document.getElementById("gameStatus");
let gameActive = true;

const resetButton = document.getElementById("resetButton");

let boardState = ["", "", "", "", "", "", "", "", ""];

const playerSelectModal = document.getElementById("playerSelectModal");
const chooseX = document.getElementById("chooseX");
const chooseO = document.getElementById("chooseO");

let humanPlayer = "X";
let computerPlayer = "O";

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

// Show modal on page load
window.addEventListener("load", () => {
  gameActive = false;
  playerSelectModal.style.display = "flex";
});

chooseX.addEventListener("click", () => {
  humanPlayer = "X";
  computerPlayer = "O";
  startGame();
});

chooseO.addEventListener("click", () => {
  humanPlayer = "O";
  computerPlayer = "X";
  startGame();
});

// function to start game
function startGame() {
  playerSelectModal.style.display = "none";
  gameActive = true;

  // If player X is computer, game should start immediately
  if (currentPlayer === computerPlayer) {
    setTimeout(computerMove, 400);
  }
}

function computerMove() {
  if (!gameActive) return;

  // Get all empty squares
  // let emptySquares = boardState
  //   .map((val, idx) => (val === "" ? idx : null))
  //   .filter(v => v !== null);

  // Pick a random empty square
  // let choice = emptySquares[Math.floor(Math.random() * emptySquares.length)];

  // new logic 
  let choice = getBestMove();

  // Mark the board
  boardState[choice] = computerPlayer;
  squares[choice].innerText = computerPlayer;
  squares[choice].classList.add(computerPlayer.toLowerCase());

  // check win or draw
  if (checkWinOrDraw()) return;

  // change to human player
  changePlayer();
}

function getBestMove() {
  // helper function to find winning move
  function findWinningMove(player) {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      const line = [boardState[a], boardState[b], boardState[c]];
      // take 3rd spot to win
      if (line.filter(v => v === player).length === 2 && line.includes("")) {
        return pattern[line.indexOf("")];
      }
    }
    return null;
  }

  // 1. try to win
  let winMove = findWinningMove(computerPlayer);
  if (winMove !== null) return winMove;
}

// function to add marks on squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => {

    // Prevent overwriting on a square
    if (boardState[index] !== "" || !gameActive || currentPlayer !== humanPlayer) return;

    // Set the text
    square.innerText = currentPlayer;

    // Add the class for the player's colour
    square.classList.add(currentPlayer.toLowerCase());

    // Update the board state
    boardState[index] = currentPlayer;

    if (checkWinOrDraw()) return;
    // Change player if game continues
    changePlayer();
  });
});

// function to add win/tie
function checkWinOrDraw() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      boardState[a] === currentPlayer &&
      boardState[b] === currentPlayer &&
      boardState[c] === currentPlayer
    ) {
      gameStatus.textContent = `${currentPlayer} wins!`;
      gameActive = false;

      squares[a].classList.add("win");
      squares[b].classList.add("win");
      squares[c].classList.add("win");

      scores[currentPlayer]++; 
      updateScore();

      resetButton.textContent = "Play Again";

      return true;
    }
  }

  if (boardState.every((square) => square !== "")) {
    gameStatus.textContent = "It's a Tie!";
    gameActive = false;
    resetButton.textContent = "Play Again";
    squares.forEach(square => square.classList.add("tie"));
    return true;
  }
  return false;
}

// Update score
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Change Players
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s Turn`;

  // call computer move automatically
  if (currentPlayer === computerPlayer && gameActive) {
    setTimeout(computerMove, 400);
  }
}

// Reset Game
resetButton.addEventListener("click", () => {
  boardState = ["", "", "", "", "", "", "", "", ""];

  squares.forEach((square) => {
    square.innerText = "";
    square.classList.remove("x", "o", "win", "tie");
  });

  currentPlayer = "X";
  gameStatus.textContent = "Player X's Turn";
  gameActive = true;

  resetButton.textContent = "Reset";

  if (computerPlayer === "X") {
    setTimeout(computerMove, 400);
  }
});