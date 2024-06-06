class Player {
    constructor(name) {
        this.name = name;
        this.color = this.getColor();
    }

    getColor() {
        const nameLower = this.name.toLowerCase();
        if (nameLower.startsWith("etienne")) {
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

        // Set initial symbol positions (move this to separate functions if needed)
        this.setSymbolIndices(defaultCircleIndices, "circle");
        this.setSymbolIndices(defaultSquareIndices, "square");
        this.setSymbolIndices(defaultCrossIndices, "cross");
    }

    setSymbolIndices(indices, symbol) {
        for (const index of indices) {
            this.cubes[index.x][index.y].setSymbol(symbol);
        }
    }

    drawBoard() {
        let defaultColor = color(255, 206, 158);
        let selectedColor = color(255, 255, 255);

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

                const cube = this.cubes[i][j];
                if (cube.symbol) {
                    this.drawSymbol(cube.symbol, cubeSize);
                }

                pop();
            }
        }
    }

    drawSymbol(symbol, size) {
        let offset = size / 2;
        strokeWeight(5);
        translate(0, 0, offset);

        switch (symbol) {
            case "circle":
                ellipse(0, 0, size * 0.8, size * 0.8);
                break;
            case "cross":
                const crossLength = size * 0.8;
                line(-crossLength / 2, 0, crossLength / 2, 0);
                line(0, -crossLength / 2, 0, crossLength / 2);
                break;
            case "square":
                const squareSize = size * 0.8;
                rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
                break;
        }
    }

    handleClick(x, y) {
        if (gamePaused) return;

        const boardX = floor((mouseX - width / 2 + 200) / (cubeSize + gap));
        const boardY = floor((mouseY - height / 2 + 200) / (cubeSize + gap));

        // Define center cubes (move this to separate function if needed)
        const centerCubesIndices = [
            { x: 1,
