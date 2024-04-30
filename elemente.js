let cubeSize = 100; 
let boardSize = 5; 

function setup() {
  createCanvas(600, 600, WEBGL);
  drawBoard();
}

function drawBoard() {
  let Color = color(255, 206, 158); 

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * cubeSize;
      let y = j * cubeSize;
      let z = 0;
      fill(Color);
      
      translate(x - 200, y - 200, z - cubeSize / 2);
      box(cubeSize);
      pop();
    }
  }
}
