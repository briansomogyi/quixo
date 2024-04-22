// Quixo Game in p5.js

// Define constants for the game
const UNIT = 50; // Each unit in the world is 50 pixels
const WIDTH = 5; // Width of the game board (in world units)
const HEIGHT = 5; // Height of the game board (in world units)
const BOARD_SIZE = WIDTH * HEIGHT; // Total number of cells on the board

let board = []; // Initialize an empty game board
let currentPlayer = 1; // Player 1 starts

function setup() {
  createCanvas(WIDTH * UNIT, HEIGHT * UNIT);
  initializeBoard();
}

function draw() {
  background(255);
  drawBoard();
}

function initializeBoard() {
  // Initialize the game board with empty cells
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = 0;
  }
}

function drawBoard() {
  // Draw the game board
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      let x = i * UNIT;
      let y = j * UNIT;
      let cellValue = board[i + j * WIDTH];

      // Draw the cell
      stroke(0);
      fill(255);
      rect(x, y, UNIT, UNIT);

      // Draw the player's piece (if any)
      if (cellValue === 1) {
        fill(255, 0, 0); // Player 1's color (red)
        ellipse(x + UNIT / 2, y + UNIT / 2, UNIT * 0.8);
      } else if (cellValue === 2) {
        fill(0, 0, 255); // Player 2's color (blue)
        rect(x + UNIT * 0.1, y + UNIT * 0.1, UNIT * 0.8, UNIT * 0.8);
      }
    }
  }
}

function mousePressed() {
  // Handle player's move
  let i = floor(mouseX / UNIT);
  let j = floor(mouseY / UNIT);
  let index = i + j * WIDTH;

  if (board[index] === 0) {
    board[index] = currentPlayer;
    currentPlayer = 3 - currentPlayer; // Switch players (1 -> 2, 2 -> 1)
  }
}
