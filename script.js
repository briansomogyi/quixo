class Player {
    constructor(name) {
        this.name = name;
        this.color = this.getColor();
    }

    getColor() {
        const nameLower = this.name.toLowerCase();
        if (nameLower.startsWith("etian")) {
            return "white";
        } else if (nameLower.startsWith("brian")) {
            return "green";
        } else if (nameLower.startsWith("giuliana")) {
            return "pink";
        } else {
            return "black";
        }
    }
}

class Cube {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.symbol = null;
    }

    setSymbol(symbol) {
        this.symbol = symbol;
    }
}

class GameBoard {
    constructor(size) {
        this.size = size;
        this.cubes = [];
        this.currentPlayer = null;
        this.selectedCube = null;
        this.win = false;

        this.initializeBoard();
    }

    initializeBoard() {
        for (let i = 0; i < this.size; i++) {
            this.cubes[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.cubes[i][j] = new Cube(i, j);
            }
        }
    }

    drawBoard() {
        let defaultColor = color(255, 206, 158); // Default color for cubes
        let selectedColor = color(255, 255, 255); // Color for selected cube (white)

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                push();
                let x = i * (cubeSize + gap);
                let y = j * (cubeSize + gap);
                let z = 0;

                if (this.selectedCube && this.selectedCube.x === i && this.selectedCube.y === j) {
                    fill(selectedColor);
                } else {
                    fill(defaultColor);
                }

                translate(x - 200, y - 200, z - cubeSize / 2);
                strokeWeight(5);
                box(cubeSize);

                if (this.cubes[i][j].symbol === "circle") {
                    drawCircleOnFace(cubeSize);
                } else if (this.cubes[i][j].symbol === "cross") {
                    drawCrossOnFace(cubeSize);
                } else if (this.cubes[i][j].symbol === "square") {
                    drawSquareOnFace(cubeSize);
                }

                pop();
            }
        }
    }

    handleClick(x, y) {
        if (gamePaused) return;

        const boardX = floor((mouseX - width / 2 + 200) / (cubeSize + gap));
        const boardY = floor((mouseY - height / 2 + 200) / (cubeSize + gap));

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
            { x: 3, y: 3 },
        ];

        // Check if the clicked cube is a center cube
        const isCenterCube = centerCubesIndices.some(index => index.x === boardX && index.y === boardY);

        // If it's a center cube, do not allow selection
        if (isCenterCube) {
            console.log('Selection of center cubes is not allowed.');
            return;
        }

        if (boardX >= 0 && boardX < this.size && boardY >= 0 && boardY < this.size) {
            if (!this.selectedCube) {
                this
