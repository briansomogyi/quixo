let board = []; // Tabla de joc are forma unui tablou în care ținem minte elementele, pionii de joc
let currentPlayer = 0; // Inițial, jucătorul curent este jucătorul 0 (poate fi 'X' sau 'O')

function setup() {
    createCanvas(400, 400);
    // Inițializăm tabla de joc (poți să ajustezi dimensiunile tablei de joc)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const pawn = new Pawn(i * 80, j * 80);
            board.push(pawn);
        }
    }
}

function draw() {
    background(220);
    // Afișăm pionii pe tabla de joc
    for (let tile of board) {
        tile.display();
    }
}

class Pawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = ''; // 'X' sau 'O'
        this.selected = false;
    }

    display() {
        // Desenăm pionul pe tabla de joc (îl poți personaliza cum dorești tu)
        stroke(0);
        fill(255);
        rect(this.x, this.y, 80, 80);
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.state, this.x + 40, this.y + 40);
    }

    // Asta se întâmplă dacă dai click
    mouseClicked() {
        if (!this.selected) {
            // Schimbi starea pionului ('X' sau 'O')
            this.state = currentPlayer === 0 ? 'X' : 'O';
            this.selected = true;
            // Verifici dacă ai câștigat
            if (checkWin()) {
                console.log(`Jucătorul ${currentPlayer + 1} a câștigat!`);
                // Poți să afișezi un mesaj în consolă sau să faci ceva
            }
            // Schimbă jucătorul curent
            currentPlayer = 1 - currentPlayer;
        }
    }
}

function checkWin() {
    // Aici implementăm condițiile logice pentru a câștiga
    // Va trebui să verifici pe orizontală, pe verticală și pe diagonală
    // Funcția returnează true dacă ai câștigat sau false în caz contrar
    // ...
}