function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
  background(220);

  // Create a cube at position (0, 0, 0) with side length 100
  let side = 100;
  translate(-100, -100, side); // Move to the center of the cube
  rotateX(frameCount * 0.01); // Rotate around X-axis
  rotateY(frameCount * 0.02); // Rotate around Y-axis
  box(side); // Draw the cube
  translate(0, 0, side); // Move to the center of the cube
  box(side); // Draw the cube
  
}
