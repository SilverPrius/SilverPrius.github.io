//create a variable for #board in .js file
const board = document.querySelector("#board");

//reset button
const resetButton = document.querySelector("#reset")
resetButton.onclick = () => {
    location.reload();
}

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
let floaterColumn = -1; //if the column that the mouse is hovered over is full(no empty spaces left), the floater piece will disappear

let animating = false

let gameOver = false

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
        if (!animating) {
            onCloumnClicked(i % 7)
        }
    }
}

// We want a new array with just the indexes of the specific column that is clicked.
// The cell number clicked will be % 7 and the result will be the column that it is in.
// The method .lastIndexOf(0) gives us the last index that is empty which will be the most bottom cell of the column. This is where the piece will land.
function onCloumnClicked(column) {
    if (!gameOver) {
        let availableRow = pieces.filter((_, index) => index % 7 === column).lastIndexOf(0);
        //if there is no empty space in that column, do nothing (the method .lastIndexOf(0) returns -1 if no zeros are found)
        if (availableRow === -1) {
            return;
        }

        // makes an array with the cell number that was clicked and the column that it is in. Find the correct div cell and add a piece class to it. The array pieces will be updated with a 1 o2 2 depending on which player's turn it is.
        pieces[(availableRow * 7) + column] = playerTurn;
        let cell = board.children[(availableRow * 7) + column];

        //Dropping a piece - create a new piece in our mouse entered. but now placed will equal true. Drop piece to the last empty index which is the last empty space at the bottom of the column. (append piece to that cell div and update the piece array with a '1' or '2' in the index array.)
        let piece = document.createElement("div");
        piece.className = "piece";
        piece.dataset.placed = true;
        piece.dataset.player = playerTurn;
        piece.dataset.winner = false;
        cell.appendChild(piece);


        //get the distance in height between the floater piece and the piece placed at the bottom of the column
        let unplacedPiece = document.querySelector("[data-placed='false']");
        let unplacedY = unplacedPiece.getBoundingClientRect().y;
        let placedY = piece.getBoundingClientRect().y;
        let yDiff = unplacedY - placedY;

        animating = true;
        removeUnplacedPiece(); //when animation is running, make the floater piece disappear and unable to make another move
        let animation = piece.animate(
            [
                { transform: `translateY(${yDiff}px)`, offset: 0 },
                { transform: `translateY(0px)`, offset: 0.6 },
                { transform: `translateY(${yDiff / 20}px)`, offset: 0.8 },
                { transform: `translateY(0px)`, offset: 0.95 }
            ],
            {
                duration: 550,
                easing: "linear",
                iterations: 1,
            }
        )

        //When the animation finishes, check if game is over
        animation.addEventListener('finish', checkGameWinOrDraw)

    }
}

function checkGameWinOrDraw() {
    animating = false;

    //check if game is a draw
    if (!pieces.includes(0)) {
        //game is a draw
        confirm("Draw Game!");
        location.reload();
    }

    //check if current player has won
    if (hasPlayerWon(playerTurn, pieces)) {
        //current player has won
        alert(`${playerTurn === RED_TURN ? "RED" : "YELLOW"} Wins!`);
        gameOver = true;
        // removeUnplacedPiece();
        // location.reload();
    }


    //Switch to next player's turn after a piece has been dropped
    if (playerTurn === RED_TURN) {
        playerTurn = YELLOW_TURN;
    } else {
        playerTurn = RED_TURN;
    }

    //changing floating piece's color after dropping a piece
    changeColorFloater();
}

function changeColorFloater() {
    removeUnplacedPiece();

    //if there is an empty space in the column that is being hovered over, create a piece and show it hovering at the top of the board
    if (pieces[floaterColumn] === 0) {
        let cell = board.children[floaterColumn];
        let piece = document.createElement("div");
        piece.className = "piece";
        piece.dataset.placed = false;
        piece.dataset.player = playerTurn;
        cell.appendChild(piece);
    }
}

function removeUnplacedPiece() {
    let unplacedPiece = document.querySelector("[data-placed='false']");
    if (unplacedPiece) {
        unplacedPiece.parentElement.removeChild(unplacedPiece)
    }
}


//function for what happens when mouse is hovered over the board
function onMouseEnteredColumn(column) {
    floaterColumn = column;
    //don't change the color of the floater when an animation is happening
    if (!animating) {
        changeColorFloater();
    }
}

function hasPlayerWon(playerTurn, pieces) {
    for (let index = 0; index < 42; index++) {
        // check horiztonal win starting at index
        if (
            index % 7 < 4 &&
            pieces[index] === playerTurn &&
            pieces[index + 1] === playerTurn &&
            pieces[index + 2] === playerTurn &&
            pieces[index + 3] === playerTurn
        ) {

            board.children[index].firstChild.dataset.winner = true
            board.children[index + 1].firstChild.dataset.winner = true
            board.children[index + 2].firstChild.dataset.winner = true
            board.children[index + 3].firstChild.dataset.winner = true
            console.log(board.children[index + 3].firstChild)
            playerTurn === null
            return true;
        }

        // check vertical win starting at index
        if (
            index < 21 &&
            pieces[index] === playerTurn &&
            pieces[index + 7] === playerTurn &&
            pieces[index + 14] === playerTurn &&
            pieces[index + 21] === playerTurn
        ) {
            board.children[index].firstChild.dataset.winner = true
            board.children[index + 7].firstChild.dataset.winner = true
            board.children[index + 14].firstChild.dataset.winner = true
            board.children[index + 21].firstChild.dataset.winner = true
            playerTurn === null
            return true;
        }

        // check diagonal win starting at index
        if (
            index % 7 < 4 &&
            index < 18 &&
            pieces[index] === playerTurn &&
            pieces[index + 8] === playerTurn &&
            pieces[index + 16] === playerTurn &&
            pieces[index + 24] === playerTurn
        ) {
            board.children[index].firstChild.dataset.winner = true
            board.children[index + 8].firstChild.dataset.winner = true
            board.children[index + 16].firstChild.dataset.winner = true
            board.children[index + 24].firstChild.dataset.winner = true
            return true;
        }

        // check diagonal win (other direction) starting at index
        if (
            index % 7 >= 3 &&
            index < 21 &&
            pieces[index] === playerTurn &&
            pieces[index + 6] === playerTurn &&
            pieces[index + 12] === playerTurn &&
            pieces[index + 18] === playerTurn
        ) {
            board.children[index].firstChild.dataset.winner = true
            board.children[index + 6].firstChild.dataset.winner = true
            board.children[index + 12].firstChild.dataset.winner = true
            board.children[index + 18].firstChild.dataset.winner = true
            return true;
        }
    }

    return false;
}