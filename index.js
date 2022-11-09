//create a variable for #board in .js file
const board = document.querySelector("#board");

const RED_TURN = 1;
const YELLOW_TURN = 2;

// 0 - empty, 1 - red, yellow - 2
// this is an array that represents empty spaces and pieces on the board. It will be continuously updated as the game progresses
const pieces = [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
];

let playerTurn = RED_TURN; // 1 - red, 2 - yellow
let floaterColumn = -1;

//cell class
//creating 42 cell divs and appending them to the board
for (let i = 0; i < 42; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);

    //function to call the cell number(i) and % by 7. The result will be a cell on the top row
    cell.onmouseenter = () => {
        onMouseEnteredColumn(i % 7);
    }

    cell.onclick = () => {
        onCloumnClicked(i % 7)
    }
}

// We want a new array with just the indexes of the specific column that is clicked.
// The cell number clicked will be % 7 and the result will be the column that it is in.
// The method .lastIndexOf(0) gives us the last index that is empty which the most bottom cell of the column. This is where the piece will land.
function onCloumnClicked(column) {
    let availableRow = pieces.filter((_, index) => index % 7 === column).lastIndexOf(0);
    //if there is no empty space in that column, do nothing (the method .lastIndexOf(0) returns -1 if no zeros are found)
    if (availableRow === -1) {
        return;
    }

    // makes an array with the cell number that was clicked and the column that it is in. Find the correct div cell and add a piece to it. The array pieces will be updated with a 1 o2 2 depending on which player's turn it is.
    pieces[(availableRow * 7) + column] = playerTurn;
    let cell = board.children[(availableRow * 7) + column];

    //Dropping a piece - create a new piece in our mouse entered. but now placed will equal true. Drop piece to the last empty index which is the last empty space at the bottom of the column. (append piece to that cell div and update the piece array with a '1' or '2' in the index array.)
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.placed = true;
    piece.dataset.player = playerTurn;
    cell.appendChild(piece);

    //Switch to next player's turn after a piece has been dropped
    if(playerTurn === RED_TURN) {
        playerTurn = YELLOW_TURN;
    }else{
        playerTurn = RED_TURN;
    }

    //changing floating piece's color after dropping a piece
    changeColorFloater();
}

    function changeColorFloater() {
        //remove pieces from the board if they are unplaced
    let unplacedPiece = document.querySelector("[data-placed='false']");
    if (unplacedPiece) {
        unplacedPiece.parentElement.removeChild(unplacedPiece)
    }

    //function to create a piece and place it in the selected column in the board
    let cell = board.children[floaterColumn];
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.placed = false;
    piece.dataset.player = playerTurn;
    cell.appendChild(piece);
    }


//function for what happens when mouse is hovered over the board
function onMouseEnteredColumn(column) {
    floaterColumn = column;
    changeColorFloater();

}

