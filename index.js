const board = document.querySelector("#board");

//cell class
for (let i = 0; i < 42; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(div);

    cell.onmouseenter = () => {
        onMouseEnteredColumn(i % 7);
    }
}