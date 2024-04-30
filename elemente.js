let cube = 50; // Size of each square on the board

function setup() {
  createCanvas(5 * cube, 5 * cube);
  drawBoard();
}

function drawBoard() {
  let lightColor = color(255, 206, 158); 
  let x, y;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      x = i * cube;
      y = j * cube;
      
      fill(lightColor);
      rect(x, y, cube, cube);
    }
  }
}