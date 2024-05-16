let cubeSize = 80; // Size of each cube on the board
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0015; // Speed of rotation
let gamePaused = false;
let gap = 20; 
let selectedCube = null; // Store the selected cube

// Define the indices of the cubes where the circle symbol will be drawn
let circleIndices = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 2 },
  { x: 2, y: 2 },
  { x: 4, y: 2 },
  { x: 0, y: 4 },
  { x: 2, y: 4 },
  { x: 4, y: 4 }
];

let squareIndices = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 3 },
  { x: 3, y: 3 },
  { x: 1, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 3 }
];

let crossIndices = [
  { x: 1, y: 0 },
  { x: 3, y: 0 },
  { x: 0, y: 1 },
  { x: 2, y: 1 },
  { x: 4, y: 1 },
  { x: 1, y: 2 },
  { x: 3, y: 2 },
  { x: 0, y: 3 },
  { x: 2, y: 3 }
];

function setup() {
  createCanvas(1250, 600, WEBGL);
  let restartButton = createButton('Restart');
  restartButton.position(20, 20);
  restartButton.mousePressed(restartGame);
  
  let resumeButton = createButton('Resume');
  resumeButton.position(100, 20);
  resumeButton.mousePressed(resumeGame);
  
  let finishButton = createButton('Finish');
  finishButton.position(180, 20);
  finishButton.mousePressed(finishGame);
}

function draw() {
  background(220);
  drawboard();
  
  textSize(20);
  textAlign(CENTER);
  text(gamePaused ? 'Game Paused' : 'Game Running', width / 2, height / 2);
}

function drawboard() {
  let defaultColor = color(255, 206, 158); // Default color for cubes
  let selectedColor = color(255, 255, 0); // Color for selected cube (yellow)
  
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * (cubeSize + gap);
      let y = j * (cubeSize + gap);
      let z = 0;

      if (selectedCube && selectedCube.x === i && selectedCube.y === j) {
        fill(selectedColor);
      } else {
        fill(defaultColor);
      }
      
      translate(x - 200, y - 200, z - cubeSize / 2);
      strokeWeight(5);
      box(cubeSize);

      if (circleIndices.some(index => index.x === i && index.y === j)) {
        drawCircleOnFace(cubeSize);
      }
      
      if (crossIndices.some(index => index.x === i && index.y === j)) {
        drawCrossOnFace(cubeSize);
      }
      
      if (squareIndices.some(index => index.x === i && index.y === j)) {
        drawSquareOnFace(cubeSize);
      }

      pop();
    }
  }
}

function drawCircleOnFace(size) {
  let offset = size / 2;
  let diameter = size * 0.8;
  fill(255, 0, 0); // Circle color
  strokeWeight(5);
  translate(0, 0, offset);
  ellipse(0, 0, diameter, diameter);
}

function drawCrossOnFace(size) {
  let offset = size / 2;
  let crossLength = size * 0.8;
  fill(0, 0, 255); // Cross color
  strokeWeight(5);
  translate(0, 0, offset);
  line(-crossLength / 2, 0, crossLength / 2, 0);
  line(0, -crossLength / 2, 0, crossLength / 2);
}

function drawSquareOnFace(size) {
  let offset = size / 2;
  let squareSize = size * 0.8;
  fill(0, 255, 0); // Square color
  strokeWeight(5);
  translate(0, 0, offset);
  rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
}

function mousePressed() {
  if (gamePaused) return;

  let boardX = floor((mouseX - width / 2 + 200) / (cubeSize + gap));
  let boardY = floor((mouseY - height / 2 + 200) / (cubeSize + gap));

  if (boardX >= 0 && boardX < boardSize && boardY >= 0 && boardY < boardSize) {
    if (!selectedCube) {
      selectedCube = { x: boardX, y: boardY };
    } else {
      switchSymbols(selectedCube, { x: boardX, y: boardY });
      selectedCube = null;
    }
  }
}

function switchSymbols(cubeA, cubeB) {
  // Check if both cubes have symbols and find their respective indices
  let cubeAIndex = findSymbolIndex(cubeA);
  let cubeBIndex = findSymbolIndex(cubeB);

  // If both cubes have symbols, swap them
  if (cubeAIndex && cubeBIndex) {
    let temp = cubeAIndex.indices[cubeAIndex.index];
    cubeAIndex.indices[cubeAIndex.index] = cubeBIndex.indices[cubeBIndex.index];
    cubeBIndex.indices[cubeBIndex.index] = temp;
  }
}

// Helper function to find the index and array of a cube's symbol
function findSymbolIndex(cube) {
  let symbolArrays = [circleIndices, squareIndices, crossIndices];
  for (let array of symbolArrays) {
    let index = array.findIndex(symbol => symbol.x === cube.x && symbol.y === cube.y);
    if (index !== -1) {
      return { indices: array, index: index };
    }
  }
  return null; // Return null if the cube doesn't contain a symbol
}

function restartGame() {
  gamePaused = false;
}

function resumeGame() {
  gamePaused = false;
}

function finishGame() {
  gamePaused = true;
}
