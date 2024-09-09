// Global Variables
const board = document.querySelector(".board")
const gridSize = 5
let currentPlayer = 1
let player = document.querySelector("#game-status-message")
let lines = []
let boxes = []

// Functions For Game Logic
const createBoard = () => {
  let lineIndex = 0

  // Initialize the boxes
  for (let row = 0; row < 9; row++) {
    boxes[row] = []
    for (let col = 0; col < 9; col++) {
      boxes[row][col] = { lines: [], status: 0 } // Each box has its own lines and status
    }
  }

  // Loop to create dots and lines
  for (let row = 0; row < gridSize * 2 - 1; row++) {
    for (let col = 0; col < gridSize * 2 - 1; col++) {
      if (row % 2 === 0 && col % 2 === 0) {
        // Create a dot
        const dot = document.createElement("div")
        dot.classList.add("dot")
        board.appendChild(dot)
      } else if (row % 2 === 0 && col % 2 === 1) {
        // Create a horizontal line
        createLineElement("horizontal-line", row, col, lineIndex)
        lineIndex++
      } else if (row % 2 === 1 && col % 2 === 0) {
        // Create a vertical line
        createLineElement("vertical-line", row, col, lineIndex)
        lineIndex++
      } else {
        const emptySpace = document.createElement("div")
        board.appendChild(emptySpace)
      }
    }
  }
}

const createLineElement = (type, row, col, lineIndex) => {
  const line = document.createElement("div")
  line.classList.add(type)
  line.dataset.index = lineIndex
  line.addEventListener("click", handleLineClick)

  board.appendChild(line)
}

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1
  player.innerText = `Player ${currentPlayer}'s Turn`
}

const handleLineClick = (event) => {
  const line = event.target
  line.style.backgroundColor = currentPlayer === 1 ? "#d80032" : " #003049"
  console.log(line)
  line.removeEventListener("click", handleLineClick)
  switchPlayer()
}
const checkForBox = () => {}
const checkForGameEnd = () => {}
const resetGame = () => {}

createBoard()
// Event Listeners
