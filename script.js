function setup() {
  createCanvas(200, 200, WEBGL);
}

function draw() {
  background(255);
  translate(-width / 2, -height / 2, 0); //moves our drawing origin to the top left corner
  box();
}