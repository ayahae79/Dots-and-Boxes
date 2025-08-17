// Glopal Variables
let currentPlayer = 1
let score1 = 0
let score2 = 0
let totalBoxesCompleted = 0

const board = document.querySelector(".board")
const p1score = document.querySelector("#player1-score") // Player 1 score inside the panel
const p2score = document.querySelector("#player2-score") // Player 2 score inside the panel
const panel1 = document.querySelector(".player1") // Player 1 panel
const panel2 = document.querySelector(".player2") // Player 2 panel
const gameStatusElement = document.querySelector("#game-status-message")
const winnerPanel = document.querySelector(".winner-panel")
const winnerStatusElement = document.querySelector("#winner-status-message")
const restartBtn = document.querySelector("#restart-btn")
const gridSize = 5
const elements = gridSize * 2 - 1

// Create the board (dots, lines, and boxes)
const createBoard = () => {
  board.style.setProperty("--elements", elements);
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

// Create a line element and add event listener on them
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

  // Change the line color based on the current player
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
      box.previousElementSibling, // Left
      box.nextElementSibling, // Right (
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) - elements
      ], // Top
      box.parentElement.children[
        Array.from(box.parentElement.children).indexOf(box) + elements
      ], // Bottom
    ]

    // If all four sides are true, the box is completed
    if (lines.every((line) => line && line.style.backgroundColor)) {
      box.dataset.completed = "true"
      box.classList.add(
        currentPlayer === 1 ? "completed-player1" : "completed-player2"
      )

      // handel after the box completetion
      updateScore()
      totalBoxesCompleted++
      boxCompleted = true
      checkForGameEnd()
    }
  })

  return boxCompleted
}

//Update the score when one box or more completed
const updateScore = () => {
  if (currentPlayer === 1) {
    score1 += 10
    p1score.innerText = score1
  } else {
    score2 += 10
    p2score.innerText = score2
  }
  // Add the class for the animation for the completed box
  const completedBoxes = document.querySelectorAll(
    ".box[data-completed='true']"
  )
  completedBoxes.forEach((box) => {
    box.classList.add("box-flash")
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
// Check if the game ends
const checkForGameEnd = () => {
  const totalBoxes = (gridSize - 1) * (gridSize - 1)

  if (totalBoxesCompleted === totalBoxes) {
    gameStatusElement.innerText = ""
    winnerPanel.style.display = "block"
    if (score1 > score2) {
      winnerStatusElement.innerText = `Player 1 dominates with ${score1} points!`
    } else if (score2 > score1) {
      winnerStatusElement.innerText = `Player 2 takes the lead with ${score2} points`
    } else {
      winnerStatusElement.innerText = `It's a tie! Both players did amazing! `
    }
  }
}

// Event listener
createBoard()
restartBtn.addEventListener("click", resetGame)
