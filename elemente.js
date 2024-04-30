function setup() {
  createCanvas(800, 600, WEBGL);
  // camera(0, 0, 50*sqrt(3), 0, 0, 0, 0, 1, 0);
  //   perspective(PI/3, 1, 5*sqrt(3), 500*sqrt(3));
  //   describe('a white box rotating in 3D space');
}

function draw() {
  background(220);

  // Create a cube at position (0, 0, 0) with side length 100
  let side = 100;
  translate(0, 0, side); // Move to the center of the cube
  rotateX(frameCount * 0.01); // Rotate around X-axis
  rotateY(frameCount * 0.02); // Rotate around Y-axis
  box(side); // Draw the cube
  // translate(0, 0, side); // Move to the center of the cube
  // box(side); // Draw the cube
  
}
