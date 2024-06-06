let font; // fontul pe care il vom folosi sa scriem pe ecran 
let fontsize = 32;
let inputPlayer1; // casuta in care jucatorul 1 isi va scrie numele 
let inputPlayer2; // casuta in care jucatorul 2 isi va scrie numele
let button1; // butonul 1 de submit 
let button2; // butonul 2 de submit
let greeting1; // titlul de deasupra casutei 1
let greeting2; // titlul de deasupra casutei 2

let cubeSize = 80; // Size of each cube on the cboard
let boardSize = 5; // Size of the board (5x5)
let rotationSpeed = 0.0015; // Speed of rotation
let gamePaused = false;
let gap = 20;
let selectedCube = null; // Store the selected cube 
let currentPlayer = 1; // jucatorul 1 incepe jocul 
let win = false; // momentan, nimeni nu a castigat


// Define the indices of the cubes where the circle symbol will be drawn by default 
const defaultCircleIndices = [
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

const defaultSquareIndices = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
    { x: 1, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 3 }
];

const defaultCrossIndices = [
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



// Define the indices of the cubes where the circle symbol will be currently drawn
let currentCircleIndices = [
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

let currentSquareIndices = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 3 },
    { x: 1, y: 4 },
    { x: 3, y: 4 },
    { x: 4, y: 3 }
];

let currentCrossIndices = [
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


function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/SedanSC-Regular.ttf');
}


function setup() {
    // create canvas
    createCanvas(1250, 600, WEBGL);
    background(220);


    greeting1 = createElement('h2', 'what is your name?');
    greeting1.position(20, 5);

    inputPlayer1 = createInput();
    inputPlayer1.position(20, 65);

    button1 = createButton('submit');
    button1.position(inputPlayer1.x + inputPlayer1.width, 65);
    button1.mousePressed(greet1);

    greeting2 = createElement('h2', 'what is your name?');
    greeting2.position(20, 85);

    inputPlayer2 = createInput();
    inputPlayer2.position(20, 135);

    button2 = createButton('submit');
    button2.position(inputPlayer2.x + inputPlayer2.width, 135);
    button2.mousePressed(greet2);

    // Set text characteristics
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER);
    textSize(50);

    // Reset button
    let resetButton = createButton('Reset');
    resetButton.position(20, height - 20);
    resetButton.mousePressed(resetGame);
}

function draw() {
    drawTable();
    drawBoard();
}

function drawBoard() {
    let defaultColor = color(255, 206, 158); // Default color for cubes
    let selectedColor = color(255, 255, 255); // Color for selected cube (white)

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            push();
            let x = i * (cubeSize + gap);
            let y = j * (cubeSize + gap);
            let z = 0;

            if (selectedCube && selectedCube.x === i && selectedCube.y === j) {
                fill(selectedColor);
            } else {
                fill(defaultColor);
            }

            translate(x - 200, y - 200, z - cubeSize / 2);
            strokeWeight(5);
            box(cubeSize);

            if (currentCircleIndices.some(index => index.x === i && index.y === j)) {
                drawCircleOnFace(cubeSize);
            }

            if (currentCrossIndices.some(index => index.x === i && index.y === j)) {
                drawCrossOnFace(cubeSize);
            }

            if (currentSquareIndices.some(index => index.x === i && index.y === j)) {
                drawSquareOnFace(cubeSize);
            }

            pop();
        }
    }
}

function drawCircleOnFace(size) {
    let offset = size / 2;
    let diameter = size * 0.8;
    strokeWeight(5);
    translate(0, 0, offset);
    ellipse(0, 0, diameter, diameter);
}

function drawCrossOnFace(size) {
    let offset = size / 2;
    let crossLength = size * 0.8;
    strokeWeight(5);
    translate(0, 0, offset);
    line(-crossLength / 2, 0, crossLength / 2, 0);
    line(0, -crossLength / 2, 0, crossLength / 2);
}

function drawSquareOnFace(size) {
    let offset = size / 2;
    let squareSize = size * 0.8;
    strokeWeight(5);
    translate(0, 0, offset);
    rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
}

function mousePressed() {
    if (gamePaused) return;

    let boardX = floor((mouseX - width / 2 + 200) / (cubeSize + gap));
    let boardY = floor((mouseY - height / 2 + 200) / (cubeSize + gap));

    // Define the indices of the center cubes
    const centerCubesIndices = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 }
    ];

    // Check if the clicked cube is a center cube
    let isCenterCube = centerCubesIndices.some(index => index.x === boardX && index.y === boardY);

    // If it's a center cube, do not allow selection
    if (isCenterCube) {
        console.log('Selection of center cubes is not allowed.');
        return;
    }

    if (boardX >= 0 && boardX < boardSize && boardY >= 0 && boardY < boardSize) {
        if (!selectedCube) {
            selectedCube = { x: boardX, y: boardY };
        } else {
            switchSymbols(selectedCube, { x: boardX, y: boardY });
            selectedCube = null;
            switchUser();
        }
    }
}


function switchUser() {
    currentPlayer = 3 - currentPlayer; // Schimb jucatorul: 3-1=2 sau 3-2=1 ( a trecut randul jucatorului 1, urmeaza jucatorul 2 sau a trecut randul jucatorului 2, urmeaza jucatorul 1 )
    console.log(`jucatorul curent este jucatorul ${currentPlayer}`);
}

function switchSymbols(cubeA, cubeB) {
    // Check if both cubes are in the same row or the same column
    let sameRow = cubeA.y === cubeB.y;
    let sameColumn = cubeA.x === cubeB.x;

    if (!sameRow && !sameColumn) {
        console.log('Cubes can only be swapped if they are in the same row or column.');
        return; // Do not swap if not in the same row or column
    }

    // Check if both cubes have symbols and find their respective indices
    let cubeAIndex = findSymbolIndex(cubeA);
    let cubeBIndex = findSymbolIndex(cubeB);

    // If both cubes have symbols, swap them
    if (cubeAIndex && cubeBIndex) {
        let temp = cubeAIndex.indices[cubeAIndex.index];
        cubeAIndex.indices[cubeAIndex.index] = cubeBIndex.indices[cubeBIndex.index];
        cubeBIndex.indices[cubeBIndex.index] = temp;
    }
}


// Helper function to find the index and array of a cube's symbol
function findSymbolIndex(cube) {
    let symbolArrays = [currentCircleIndices, currentSquareIndices, currentCrossIndices];
    for (let array of symbolArrays) {
        let index = array.findIndex(symbol => symbol.x === cube.x && symbol.y === cube.y);
        if (index !== -1) {
            return { indices: array, index: index };
        }
    }
    return null; // Return null if the cube doesn't contain a symbol
}

function resetGame() {
    gamePaused = false;
    currentCircleIndices = defaultCircleIndices.map(obj => ({ ...obj }));
    currentCrossIndices = defaultCrossIndices.map(obj => ({ ...obj }));
    currentSquareIndices = defaultSquareIndices.map(obj => ({ ...obj }));
}

function checkWin() {
    if (win) {
        win = false;
    }
}

function drawTable() {
    push();
    fill(65, 25, 0);
    ellipse(0, 0, 700, 700);
    pop();
}

function greet1() {
    const name = inputPlayer1.value();
    greeting1.html('hello ' + name + '!');
    inputPlayer1.remove();
    button1.remove();

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


function greet2() {
    const name = inputPlayer2.value();
    greeting2.html('hello ' + name + '!');
    inputPlayer2.remove();
    button2.remove();

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