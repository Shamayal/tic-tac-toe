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

const xWinsSection = document.querySelector(".X-wins");
const oWinsSection = document.querySelector(".O-wins");
const drawSection = document.querySelector(".draw");

const strikeLine = document.querySelector(".strike-line");

// function to add marks on squares
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    console.log(`Square ${index + 1} clicked by ${currentPlayer}`);

    // Prevent overwriting on a square
    if (boardState[index] !== "" || !gameActive) return;

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
      showDisplaySection(xWinsSection);
      scores[currentPlayer]++; 
      updateScore();
      return true;
    }
  }

  console.log("checking");
  if (boardState.every((square) => square !== "")) {
    gameStatus.textContent = "It's a Tie!";
    gameActive = false;
    showDisplaySection(drawSection);
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
}

// Reset Game
resetButton.addEventListener("click", () => {
  boardState = ["", "", "", "", "", "", "", "", ""];

  squares.forEach((square) => {
    square.innerText = "";
  });

  currentPlayer = "X";
  gameStatus.textContent = "Player X's Turn";
  gameActive = true;
});

function showDisplaySection(section) {
  [xWinsSection, oWinsSection, drawSection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}
