class Player {
    constructor(name) {
        this.name = name;
        this.color = this.getColor();
    }

    getColor() {
        const nameLower = this.name.toLowerCase();
        if (nameLower.startsWith("elian")) {
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

        // Set initial symbol positions (move these to separate functions if needed)
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
        // Implement drawing logic using the cubes array and their symbols
        // (reference the original drawBoard function for implementation details)
    }

    handleClick(x, y) {
        // Implement click handling logic based on selected cube and game state
        // (reference the original mousePressed function for implementation details)
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
        console.log(`Current player: ${this.currentPlayer.name}`);
    }

    checkWin() {
        // Implement win checking logic based on symbol placement
        // (can be a separate function if needed)
    }
}

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.font = null;
        this.board = null;
    }

    preload() {
        this.font = loadFont("assets/SedanSC-Regular.ttf");
    }

    setup() {
        createCanvas(1250, 600, WEBGL);
        background(220);

        this.board = new GameBoard(5); // Change board size here if needed

        // Implement player creation logic (can be a separate function)
        player1 = new Player(inputPlayer1.value());
        player2 = new Player(inputPlayer2.value());

        // Remove input elements and buttons after player creation
        inputPlayer1.remove();
        inputPlayer2.remove();
        button1.remove();
        button2.remove();

        // Set text characteristics
        textFont(this.font);
        textSize(32);
        textAlign(CENTER);

        // Reset button functionality
        let resetButton = createButton("Reset");
        resetButton.position(20, height - 20);
        resetButton.mousePressed(() => this.resetGame());
    }

    draw() {
        this.board.drawBoard();
    }

    resetGame() {
        this.board.initializeBoard();
        this.board.currentPlayer = player1;
        this.board.win = false;
    }
}

// Create game object and start the game
let game = new Game(createCanvas());
preload();
setup();
draw();
