let font; // fontul pe care il vom folosi sa scriem pe ecran 
let fontsize = 32;
let input; // casuta in care ne vom scrie numele 
let button; // butonul de submit 
let greeting;// // titlul de deasupra casutei

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/SedanSC-Regular.ttf'); // incarca fontul
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
}

function greet() {
    const name = input.value();
    greeting.html('hello ' + name + '!');
    input.value('');

    let color;
    if ("etian".startsWith(name.toLowerCase())) {
        color = " white";

    } else {
        if ( "brian".startsWith(name.toLowerCase())) {
            color = "green";

        } else {
            if ( "giuliana".startsWith(name.toLowerCase())) {
                color = "pink";

            } else {
                color = "black";

            }
        }
    }

    for (let i = 0; i < 200; i++) {
        push();
        fill(color);
        translate(-width / 2 + random(width), -height / 2 + random(height), 0); //moves our drawing origin to the top left corner
        rotate(random(2 * PI));
        text(name, 0, 0);
        pop();
    }
}
const names = ["Etian", "Brian", "Giulia",];
