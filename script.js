// Glopal Variables
let currentPlayer = 1
let score1 = 0
let score2 = 0
let totalBoxesCompleted = 0

const board = document.querySelector(".board")
const p1score = document.querySelector("#player1-score")
const p2score = document.querySelector("#player2-score")
const panel1 = document.querySelector(".player1") // Player 1 panel
const panel2 = document.querySelector(".player2") // Player 2 panel
const gameStatusElement = document.querySelector("#game-status-message")
const winnerStatusElement = document.querySelector("#winner-status-message")
const restartBtn = document.querySelector("#restart-btn")
const gridSize = 5
const winnerPanel = document.querySelector(".winner-panel")

// Create the board (dots, lines, and boxes)
const createBoard = () => {
  const elements = gridSize * 2 - 1
  board.innerHTML = ""
  for (let row = 0; row < elements; row++) {
    for (let col = 0; col < elements; col++) {
      if (row % 2 === 0 && col % 2 === 0) {
        // Dot element
        const dot = document.createElement("div")
        dot.classList.add("dot")
        board.appendChild(dot)
      } else if (row % 2 === 0 && col % 2 === 1) {
        // Horizontal line element
        const horizontalLine = createLine("horizontal-line")
        board.appendChild(horizontalLine)
      } else if (row % 2 === 1 && col % 2 === 0) {
        // Vertical line element
        const verticalLine = createLine("vertical-line")
        board.appendChild(verticalLine)
      } else {
        // Box element
        const box = document.createElement("div")
        box.classList.add("box")
        box.dataset.completed = "false"
        board.appendChild(box)
      }
    }
  }
  panel1.classList.add("player-active")
}

// Create a line element (either horizontal or vertical)
const createLine = (type) => {
  const line = document.createElement("div")
  line.classList.add(type)
  line.addEventListener("click", handleLineClick)
  return line
}

// Handle when a line is clicked
const handleLineClick = (event) => {
  const line = event.target

  // Check if the line has already been clicked
  if (line.style.backgroundColor) return

  // Set the line color based on the current player
  line.style.backgroundColor = currentPlayer === 1 ? "#ff0080" : "#0080ff"

  // Check if a box was completed by this move
  const boxCompleted = checkForBoxCompletion()

  // If no box was completed, switch to the next player
  if (!boxCompleted) {
    switchPlayer()
  }
}

// Check all the boxes and update the score if any box is completed
const checkForBoxCompletion = () => {
  let boxCompleted = false
  const boxes = document.querySelectorAll(".box")

  boxes.forEach((box) => {
    // Check if the box is already completed
    if (box.dataset.completed === "true") return

    // Check the four sides of the box
    const lines = [
      box.previousElementSibling, // Left (vertical line)
      box.nextElementSibling, // Right (vertical line)
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) - 9
      ], // Top (horizontal line)
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) + 9
      ], // Bottom (horizontal line)
    ]

    // If all four sides are filled, mark the box as completed
    if (lines.every((line) => line && line.style.backgroundColor)) {
      box.dataset.completed = "true"
      box.classList.add(
        currentPlayer === 1 ? "completed-player1" : "completed-player2"
      )

      // Update the score
      updateScore()
      totalBoxesCompleted++
      boxCompleted = true
      checkForGameEnd()
    }
  })

  return boxCompleted // Return true if at least one box was completed
}

const updateScore = () => {
  if (currentPlayer === 1) {
    score1 += 10
    p1score.innerText = score1
  } else {
    score2 += 10
    p2score.innerText = score2
  }
  // Trigger box flash effect
  const completedBoxes = document.querySelectorAll(
    ".box[data-completed='true']"
  )
  completedBoxes.forEach((box) => {
    box.classList.add("box-flash") // Add the class for the flash animation
  })
}

// Switch the current player and update the UI with the active box shadow
const switchPlayer = () => {
  // Remove the active class from both panels
  panel1.classList.remove("player-active")
  panel2.classList.remove("player-active-2")

  // Switch the current player
  currentPlayer = currentPlayer === 1 ? 2 : 1
  gameStatusElement.innerText = `Player ${currentPlayer}'s Turn`

  // Add the active class to the current player's panel
  if (currentPlayer === 1) {
    panel1.classList.add("player-active")
  } else {
    panel2.classList.add("player-active-2")
  }
}

// Reset the game
const resetGame = () => {
  currentPlayer = 1
  score1 = 0
  score2 = 0
  totalBoxesCompleted = 0

  p1score.innerText = score1
  p2score.innerText = score2
  gameStatusElement.innerText = `Player 1's Turn`
  panel1.classList.add("player-active")
  panel2.classList.remove("player-active-2")
  winnerPanel.style.display = "none"

  createBoard()
}

const checkForGameEnd = () => {
  const totalBoxes = (gridSize - 1) * (gridSize - 1) // Total number of boxes on the board

  if (totalBoxesCompleted === totalBoxes) {
    gameStatusElement.innerText = ""
    winnerPanel.style.display = "block"
    if (score1 > score2) {
      winnerStatusElement.innerText = `Player ${currentPlayer}'s wins`
    } else if (score2 > score1) {
      winnerStatusElement.innerText = `Player ${currentPlayer}'s wins`
    } else {
      winnerStatusElement.innerText = `its a tie`
    }
  }
}

// Initialize the game
createBoard()
restartBtn.addEventListener("click", resetGame)
