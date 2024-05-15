let cubeSize = 80; // Size of each cube on the cboard
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0015; // Speed of rotation
let gamePaused = false;
let gap = 20; 

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
  
  // Resume button
  let resumeButton = createButton('Resume');
  resumeButton.position(100, 20);
  resumeButton.mousePressed(resumeGame);
  
  // Finish button
  let finishButton = createButton('Finish');
  finishButton.position(180, 20);
  finishButton.mousePressed(finishGame);
}

function draw() {
  background(220);
  drawboard();
  
  // Display game state
  textSize(20);
  textAlign(CENTER);
  text(gamePaused ? 'Game Paused' : 'Game Running', width / 2, height / 2);
}

function drawboard() {
  let Color = color(255, 206, 158); 
  let rotationAngle = millis() * rotationSpeed; // Calculate rotation angle based on time

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * (cubeSize + gap); // Add gap between cubes
      let y = j * (cubeSize + gap); // Add gap between cubes
      let z = 0;
      fill(Color);
      
      translate(x - 200, y - 200, z - cubeSize / 2);
      //rotateX(rotationAngle); // Apply rotation around X axis
      //rotateY(rotationAngle); // Apply rotation around Y axis
      strokeWeight(5);
      box(cubeSize);

      // Check if the current cube is in the circleIndices array
      if (circleIndices.some(index => index.x === i && index.y === j)) {
        drawCircleOnFace(cubeSize);
      }
      
      // Check if the current cube is in the crossIndices array
      if (crossIndices.some(index => index.x === i && index.y === j)) {
        drawCrossOnFace(cubeSize);
      }
      
      //Check if the current cube is in the crossIndices array
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
  let circleColor = color(255, 0, 0); // Circle color
  strokeWeight(5);

  translate(0, 0, offset);
  ellipse(0, 0, diameter, diameter);
}


function drawCrossOnFace(size) {
  let offset = size / 2;
  let crossLength = size * 0.8;
  let crossColor = color(0, 0, 255); // Cross color
  strokeWeight(5);

  translate(0, 0, offset);
  rect(-crossLength / 2, -size / 8, crossLength, size / 4);
  rect(-size / 8, -crossLength / 2, size / 4, crossLength);
}


function drawSquareOnFace(size) {
  let offset = size / 2;
  let squareSize = size * 0.8;
  let squareColor = color(0, 255, 0); // Square color
  strokeWeight(5);

translate(0, 0, offset);
  rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
}




function mousePressed() {
  if (gamePaused) return; // Do nothing if the game is paused

  // Calculate the board coordinates based on the mouse position
  let boardX = floor((mouseX - width / 2 + 200) / (cubeSize + gap));
  let boardY = floor((mouseY - height / 2 + 200) / (cubeSize + gap));

  // Check if the click is within the bounds of the board
  if (boardX >= 0 && boardX < boardSize && boardY >= 0 && boardY < boardSize) {
    // Find the index of the cube that was clicked
    let clickedIndex = { x: boardX, y: boardY };

    // Check if the clicked cube is a circle, cross, or square
    let circleClicked = circleIndices.findIndex(index => index.x === boardX && index.y === boardY);
    let crossClicked = crossIndices.findIndex(index => index.x === boardX && index.y === boardY);
    let squareClicked = squareIndices.findIndex(index => index.x === boardX && index.y === boardY);

    // If a circle was clicked, swap with the next square, and vice versa
    if (circleClicked !== -1) {
      // Find the next square index
      let nextSquare = (squareClicked + 1) % squareIndices.length;
      [circleIndices[circleClicked], squareIndices[nextSquare]] = [squareIndices[nextSquare], circleIndices[circleClicked]];
    } else if (crossClicked !== -1) {
      // Find the next circle index
      let nextCircle = (circleClicked + 1) % circleIndices.length;
      [crossIndices[crossClicked], circleIndices[nextCircle]] = [circleIndices[nextCircle], crossIndices[crossClicked]];
    } else if (squareClicked !== -1) {
      // Find the next cross index
      let nextCross = (crossClicked + 1) % crossIndices.length;
      [squareIndices[squareClicked], crossIndices[nextCross]] = [crossIndices[nextCross], squareIndices[squareClicked]];
    }
  }
}



function restartGame() {
  // Resume the game
  gamePaused = false;
}



function resumeGame() {
  // Add logic to resume the game
  gamePaused = false;
}

function finishGame() {
  // Add logic to finish the game
  gamePaused = true;
}







  