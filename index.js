//create a variable for #board in .js file
const board = document.querySelector("#board");

//cell class
//creating 42 cell divs and appending them to the board
for (let i = 0; i < 42; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);

    //function to name the cell that the mouse is hovered over to the number of which row it is in (0-6)
    cell.onmouseenter = () => {
        onMouseEnteredColumn(i % 7);
    }
}

    
function onMouseEnteredColumn(column) {
    //remove existing unplaced piece
    let unplacedPiece = document.querySelector("[data-placed='false']");
    if(unplacedPiece) {
        unplacedPiece.parentElement.removeChild(unplacedPiece)
    }



    //function to create a piece and place it on the selected cell in the board
    let cell = board.children [column];
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.placed = false;
    cell.appendChild(piece);
}

