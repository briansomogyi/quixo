let cubeSize = 100; // Size of each cube on the cboard
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0005; // Speed of rotation

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
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(220);
  drawboard();
}

function drawboard() {
  let Color = color(255, 206, 158); 
  let rotationAngle = millis() * rotationSpeed; // Calculate rotation angle based on time

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      push();
      let x = i * cubeSize;
      let y = j * cubeSize;
      let z = 0;
      fill(Color);
      
      translate(x - 100, y - 100, z - cubeSize / 2);
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