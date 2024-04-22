function setup() {
    createCanvas(100, 100, WEBGL);
    camera(0, 0, 50*sqrt(3), 0, 0, 0, 0, 1, 0);
    perspective(PI/3, 1, 5*sqrt(3), 500*sqrt(3));
    describe('a white box rotating in 3D space');
  }
  
  function draw() {
    background(200);
    //rotateX(frameCount * 0.01);
    //rotateY(frameCount * 0.01);
    box(50);
  }