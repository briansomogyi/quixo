let font; // fontul pe care il vom folosi sa scriem pe ecran 
let fontsize = 32;
let input; // casuta in care ne vom scrie numele 
let button; // butonul de submit 
let greeting;// // titlul de deasupra casutei

let cubeSize = 80; // Size of each cube on the cboard
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0015; // Speed of rotation
let gamePaused = false;
let gap = 20;
let selectedCube = null; // Store the selected cube 
let currentPlayer = 1; // jucatorul 1 incepe jocul 

// Define the indices of the cubes where the circle symbol will be drawn by default 
const defaultCircleIndices = [
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

const defaultSquareIndices = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 3 },
  { x: 3, y: 3 },
  { x: 1, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 3 }
];

const defaultCrossIndices = [
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



// Define the indices of the cubes where the circle symbol will be currently drawn
let currentCircleIndices = [
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

let currentSquareIndices = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 3 },
  { x: 3, y: 3 },
  { x: 1, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 3 }
];

let currentCrossIndices = [
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


function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('assets/SedanSC-Regular.ttf');
}


function setup() {
  // create canvas
  createCanvas(1250, 600, WEBGL);
  background(220);


  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER);
  textSize(50);

  // Restart button
  let restartButton = createButton('Restart');
  restartButton.position(20, height - 20);
  restartButton.mousePressed(restartGame);

  // Resume button
  let resumeButton = createButton('Resume');
  resumeButton.position(100, height - 20);
  resumeButton.mousePressed(resumeGame);

  // Finish button
  let finishButton = createButton('Finish');
  finishButton.position(180, height - 20);
  finishButton.mousePressed(finishGame);
}

function draw() {
  //background(220);
  drawTable();
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

      if (currentCircleIndices.some(index => index.x === i && index.y === j)) {
        drawCircleOnFace(cubeSize);
      }

      if (currentCrossIndices.some(index => index.x === i && index.y === j)) {
        drawCrossOnFace(cubeSize);
      }

      if (currentSquareIndices.some(index => index.x === i && index.y === j)) {
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
      switchUser();
    }
  }
}

function switchUser() {
  currentPlayer = 3 - currentPlayer; // Schimb jucatorul: 3-1=2 sau 3-2=1 ( a trecut randul jucatorului 1, urmeaza jucatorul 2 sau a trecut randul jucatorului 2, urmeaza jucatorul 1 )
  console.log(`jucatorul curent este jucatorul ${currentPlayer}`);
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
  let symbolArrays = [currentCircleIndices, currentSquareIndices, currentCrossIndices];
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
  currentCircleIndices = defaultCircleIndices.map(obj => ({ ...obj }));
  currentCrossIndices = defaultCrossIndices.map(obj => ({ ...obj }));
  currentSquareIndices = defaultSquareIndices.map(obj => ({ ...obj }));
}

function resumeGame() {
  gamePaused = false;
}

function finishGame() {
  gamePaused = true;
}


function drawTable() {
  push();
  fill(255, 128, 0);
  ellipse(0, 0, 700, 700);
  pop();
}

function greet() {
  const name = input.value();
  greeting.html('hello ' + name + '!');
  input.value('');

  let color = getColorByName(name);

  for (let i = 0; i < 200; i++) {
    push();
    fill(color);
    translate(-width / 2 + random(width), -height / 2 + random(height), 0); //moves our drawing origin to the top left corner
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}


function getColorByName(name) {
  let color;
  if ("etian".startsWith(name.toLowerCase())) {
    color = " white";

  } else {
    if ("brian".startsWith(name.toLowerCase())) {
      color = "green";

    } else {
      if ("giuliana".startsWith(name.toLowerCase())) {
        color = "pink";

      } else {
        color = "black";

      }
    }
  }
  return color;
}