const myBoard = [
  ["O", "X", "O", "X", "O",],
  ["X", " ", "X", " ", "X",],
  ["O", "X", "O", "X", "O",],
  ["X", " ", "X", " ", " ",],
  ["O", " ", "O", " ", "O",],
];

console.log(`${myBoard.join("\n")}\n\n`);

const names = ["Etian", "Brian", "Giulia",];

console.log(`${names.join("\n")}\n\n`);

let font, fontsize = 32;
let input, button, greeting;

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

console.log(circleIndices);

console.log(crossIndices);

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
  // background(220);
  drawTable();
  drawboard();

  // Display game state
  textSize(20);
  textAlign(CENTER);
  text(gamePaused ? 'Game Paused' : 'Game Running', width / 2, height / 2);
}

function drawboard() {
  let boardColor = color(255, 206, 158);
  let rotationAngle = millis() * rotationSpeed; // Calculate rotation angle based on time

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * (cubeSize + gap); // Add gap between cubes
      let y = j * (cubeSize + gap); // Add gap between cubes
      let z = 0;
      fill(boardColor);

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

  push();
  fill(circleColor);
  strokeWeight(5);
  translate(0, 0, offset);
  ellipse(0, 0, diameter, diameter);
  pop();
}


function drawCrossOnFace(size) {
  let offset = size / 2;
  let crossLength = size * 0.8;
  let crossColor = color(0, 0, 255); // Cross color

  push();
  fill(crossColor);
  strokeWeight(5);
  translate(0, 0, offset);
  rect(-crossLength / 2, -size / 8, crossLength, size / 4);
  rect(-size / 8, -crossLength / 2, size / 4, crossLength);
  pop();
}

function restartGame() {
  // Add logic to restart the game
  // Shuffle the indices for circle and cross symbols
  shuffleArray(circleIndices);
  shuffleArray(crossIndices);
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

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  console.log(array);
}


function drawTable() {
  push();
  fill(255, 128, 0);
  ellipse(0, 0, 700, 700);

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

