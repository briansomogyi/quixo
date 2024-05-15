let font, fontsize = 32;
let input, button, greeting;

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/SedanSC-Regular.ttf');
}

function setup() {
    // create canvas
    createCanvas(1250, 600);
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
    if (name == "Etian") {
        color = "blue";

    } else {
        if (name == "Brian") {
            color = "green";

        } else {
            if (name == "Giulia" || name == "Giuliana") {
                color = "pink";

            } else {
                color = "white";

            }
        }
    }

    for (let i = 0; i < 200; i++) {
        push();
        fill(color);
        translate(random(width), random(height));
        rotate(random(2 * PI));
        text(name, 0, 0);
        pop();
    }
}
const names = ["Etian", "Brian", "Giulia",];
