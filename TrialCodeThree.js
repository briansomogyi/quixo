let font; // fontul pe care il vom folosi sa scriem pe ecran 
let fontsize = 32;
let input; // casuta in care ne vom scrie numele 
let button; // butonul de submit 
let greeting; // titlul de deasupra casutei

let cubeSize = 80; // Size of each cube on the board
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0015; // Speed of rotation
let gamePaused = false;
let gap = 20;
let selectedCube = null; // Store the selected cube
let secondSelectedCube = null; // Store the second selected cube

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

// ... other indices ...

function preload() {
  font = loadFont('assets/SedanSC-Regular.ttf');
}

function setup() {
  createCanvas(1250, 600, WEBGL);
  background(220);

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

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
  drawTable();
  drawboard();

  textSize(20);
  textAlign(CENTER);
  text(gamePaused ? 'Game Paused' : 'Game Running', width / 2, height / 2);
}

function drawboard() {
  let defaultColor = color(255, 206, 158);
  let selectedColor = color(255, 255, 0);
  let secondSelectedColor = color(0, 0, 255); // Orange color for the second selected cube

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * (cubeSize + gap);
      let y = j * (cubeSize + gap);
      let z = 0;

      if (selectedCube && selectedCube.x === i && selectedCube.y === j) {
        fill(selectedColor);
      } else if (secondSelectedCube && secondSelectedCube.x === i && secondSelectedCube.y === j) {
        fill(secondSelectedColor);
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
    fill(255, 206, 158); // Circle color
    strokeWeight(5);
    translate(0, 0, offset);
    ellipse(0, 0, diameter, diameter);
  }
  
  function drawCrossOnFace(size) {
    let offset = size / 2;
    let crossLength = size * 0.8;
    fill(255, 206, 158); // Cross color
    strokeWeight(5);
    translate(0, 0, offset);
    line(-crossLength / 2, 0, crossLength / 2, 0);
    line(0, -crossLength / 2, 0, crossLength / 2);
  }
  
  function drawSquareOnFace(size) {
    let offset = size / 2;
    let squareSize = size * 0.8;
    fill(255, 206, 158); // Square color
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
    } else if (!secondSelectedCube) {
      secondSelectedCube = { x: boardX, y: boardY };
    } else {
      switchSymbols(selectedCube, secondSelectedCube);
      selectedCube = null;
      secondSelectedCube = null;
    }
  }
}

function switchSymbols(cubeA, cubeB) {
    // Check if both cubes have symbols and find their respective indices
    let cubeAIndex = findSymbolIndex(cubeA);
    let cubeBIndex = findSymbolIndex(cubeB);
  
      // Check if cubes are neighbors
      let areNeighbors = (Math.abs(cubeA.x - cubeB.x) === 1 && cubeA.y === cubeB.y) ||
      (cubeA.x === cubeB.x && Math.abs(cubeA.y - cubeB.y) === 1);
  
  // If both cubes have symbols and are neighbors, swap them
  if (cubeAIndex && cubeBIndex && areNeighbors) {
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
    translate(-width / 2 + random(width), -height / 2 + random(height), 0);
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}

function getColorByName(name) {
  let color;
  if ("etian".startsWith(name.toLowerCase())) {
    color = "white";
  } else if ("brian".startsWith(name.toLowerCase())) {
    color = "green";
  } else if ("giuliana".startsWith(name.toLowerCase())) {
    color = "pink";
  } else {
    color = "black";
  }
  return color;
}
