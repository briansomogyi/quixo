let tiles = []; // Array to store tile objects

function setup() {
    createCanvas(400, 400);
    // Initialize tiles (you can adjust the grid size)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            tiles.push(new Tile(i * 80, j * 80));
        }
    }
}

function draw() {
    background(220);
    // Display tiles
    for (let tile of tiles) {
        tile.display();
    }
}

class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = ''; // 'X' or 'O'
        this.selected = false;
    }

    display() {
        // Draw the tile (customize as needed)
        stroke(0);
        fill(255);
        rect(this.x, this.y, 80, 80);
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.state, this.x + 40, this.y + 40);
    }

    // Handle tile click
    mouseClicked() {
        if (!this.selected) {
            // Toggle state ('X' or 'O')
            this.state = currentPlayer === 0 ? 'X' : 'O';
            this.selected = true;
            // Check for a win
            if (checkWin()) {
                console.log(`Player ${currentPlayer + 1} wins!`);
                // You can display a message or take other actions here
            }
            // Switch players
            currentPlayer = 1 - currentPlayer;
        }
    }
}

let currentPlayer = 0; // Player 0 starts (can be 'X' or 'O')

function checkWin() {
    // Implement your winning condition logic here
    // You'll need to check rows, columns, and diagonals
    // Return true if a win is detected, otherwise false
    // ...
}