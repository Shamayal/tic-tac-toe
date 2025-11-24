const squares = document.querySelectorAll('.square');

const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

const gameStatus = document.getElementById('gameStatus');

const resetButton = document.getElementById('resetButton');

let boardState = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';

let scores = {
  X: 0,
  O: 0
};

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    console.log(`Square ${index + 1} clicked!`);
  });
});

resetButton.addEventListener("click", () => {
  console.log('Reset Button Clicked!');
});