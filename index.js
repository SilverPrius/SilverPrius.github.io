//create a variable for #board in .js file
const board = document.querySelector("#board");

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
}

//function for what happens when mouse is hovered over the board
function onMouseEnteredColumn(column) {

    //function to create a piece and place it in the selected column in the board
    let cell = board.children[column];
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.placed = false;
    cell.appendChild(piece);

    //remove existing unplaced piece
    let unplacedPiece = document.querySelector("[data-placed='false']");
    if (unplacedPiece) {
        unplacedPiece.parentElement.removeChild(unplacedPiece)
    }
}

