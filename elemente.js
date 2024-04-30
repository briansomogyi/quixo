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

function restartGame() {
  // Add logic to restart the game
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