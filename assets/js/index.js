import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

function createSquare(row, col) {
    const square = document.createElement("div")
    square.setAttribute("class", "square")
    square.dataset.row = row;
    square.dataset.col = col
    square.addEventListener("click", squareClickHandler)
    return square
}

function createGrid(grid) {
    const gridElement = document.createElement("div")
    gridElement.setAttribute("class", "grid")

    for(let x = 0; x < grid.length; x++){
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        row.setAttribute("id", `row-${x}`)
        for( let y = 0; y < grid[0].length; y++){
            let square = createSquare(x, y)
            square.setAttribute("id", `square-${y}`)
            row.appendChild(square)
        }
        gridElement.appendChild(row)
    }
    return gridElement    
}

function squareClickHandler(square) {
    const row = square.target.dataset.row
    const col = square.target.dataset.col
    const hit = board.makeHit(row, col)
    if(hit === null){
        square.target.classList.add("miss")
    }else{
        square.target.classList.add("hit")
        square.target.innerText = hit
    }
    if(board.isGameOver()){
        alert("game-over")
        removeClassHandlers('.square')
        const victoryMessage = document.querySelector(".result-message")
        victoryMessage.innerText = "YOU WIN"
        victoryMessage.classList.remove('hidden')
    }
    // debugger
}

function removeClassHandlers(className) {
    const nodes = document.querySelectorAll(className)
    nodes.forEach((node) => node.removeEventListener("click", squareClickHandler))
}

// Your code here

const grid = createGrid(board.grid)
document.body.appendChild(grid)