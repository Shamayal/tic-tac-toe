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

const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
easy.style.display = "none";
hard.style.display = "none";
let difficultyLevel = "easy";

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
  showDifficultyOptions();
});

chooseO.addEventListener("click", () => {
  humanPlayer = "O";
  computerPlayer = "X";
  showDifficultyOptions();
});

// function to let player choose difficulty level
function showDifficultyOptions() {
  chooseX.style.display = "none";
  chooseO.style.display = "none";

  easy.style.display = "inline-block";
  hard.style.display = "inline-block";
}

// start game after difficulty level chosen
easy.addEventListener("click", () => {
  difficultyLevel = "easy";
  startGame();
});

hard.addEventListener("click", () => {
  difficultyLevel = "hard";
  startGame();
});

// function to start game
function startGame() {
  playerSelectModal.style.display = "none";
  gameActive = true;

  // If player X is computer, game should start immediately
  if (currentPlayer === computerPlayer) {
    setTimeout(computerMove, 800);
  }
}

function computerMove() {
  if (!gameActive) return;

  let choice = difficultyLevel === "easy" ? easyMove() : getBestMove();

  // Mark the board
  boardState[choice] = computerPlayer;
  squares[choice].innerText = computerPlayer;
  squares[choice].classList.add(computerPlayer.toLowerCase());

  // check win or draw
  if (checkWinOrDraw()) return;

  // change to human player
  changePlayer();
}

function easyMove() {
  // get all empty squares
  let emptySquares = boardState
    .map((val, idx) => (val === "" ? idx : null))
    .filter((v) => v !== null);

  // pick a random empty square
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

function getBestMove() {
  // helper function to find winning move
  function findWinningMove(player) {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      const line = [boardState[a], boardState[b], boardState[c]];
      // take 3rd spot to win
      if (line.filter((v) => v === player).length === 2 && line.includes("")) {
        return pattern[line.indexOf("")];
      }
    }
    return null;
  }

  // 1. try to win
  let winMove = findWinningMove(computerPlayer);
  if (winMove !== null) return winMove;

  // 2. block human player's winning move
  let blockMove = findWinningMove(humanPlayer);
  if (blockMove !== null) return blockMove;

  // 3. take center if free
  if (boardState[4] === "") return 4;

  // 4. take a random corner
  const corners = [0, 2, 6, 8];
  const freeCorners = corners.filter((i) => boardState[i] === "");
  if (freeCorners.length > 0) {
    return freeCorners[Math.floor(Math.random() * freeCorners.length)];
  }

  // 5. random square
  const emptySquares = boardState
    .map((val, idx) => (val === "" ? idx : null))
    .filter((v) => v !== null);

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

// function to add marks on squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    // Prevent overwriting on a square
    if (
      boardState[index] !== "" ||
      !gameActive ||
      currentPlayer !== humanPlayer
    )
      return;

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
    squares.forEach((square) => square.classList.add("tie"));
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
    setTimeout(computerMove, 800);
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
    setTimeout(computerMove, 800);
  }
});
