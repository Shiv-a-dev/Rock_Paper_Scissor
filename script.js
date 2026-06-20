const buttons = document.querySelectorAll(".btn");
const statusLines = document.querySelectorAll(".move");
const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const newGameButton = document.getElementById("newGameButton");

let roundNumber = 0;
let userScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getUserChoice() {
  const userChoice = prompt("Enter Rock, Paper, or Scissors:");
  return userChoice.charAt(0).toUpperCase() + userChoice.slice(1).toLowerCase();
}

function updateStatus(userChoice, computerChoice, result) {
  if (statusLines[0]) {
    statusLines[0].textContent = "Make your move!";
  }

  if (statusLines[1]) {
    statusLines[1].textContent = `Your move: ${userChoice}`;
  }

  if (statusLines[2]) {
    statusLines[2].textContent = `Computer's move: ${computerChoice}`;
  }

  if (statusLines[3]) {
    statusLines[3].textContent = `Current Result: ${result}`;
  }

  if (statusLines[4]) {
    statusLines[4].textContent = `Round Number: ${roundNumber}`;
  }

  if (statusLines[5]) {
    statusLines[5].textContent = `Round Won by User: ${userScore}`;
  }

  if (statusLines[6]) {
    statusLines[6].textContent = `Round Won by Computer: ${computerScore}`;
  }
}

function showWinnerPopup(winner) {
  if (winnerMessage) {
    winnerMessage.textContent = `${winner} is the winner!`;
  }

  if (winnerPopup) {
    winnerPopup.classList.remove("hidden");
    winnerPopup.setAttribute("aria-hidden", "false");
  }
}

function resetGame() {
  roundNumber = 0;
  userScore = 0;
  computerScore = 0;
  gameOver = false;

  if (winnerPopup) {
    winnerPopup.classList.add("hidden");
    winnerPopup.setAttribute("aria-hidden", "true");
  }

  if (statusLines[0]) {
    statusLines[0].textContent = "Make your move!";
  }

  if (statusLines[1]) {
    statusLines[1].textContent = "Your move:";
  }

  if (statusLines[2]) {
    statusLines[2].textContent = "Computer's move:";
  }

  if (statusLines[3]) {
    statusLines[3].textContent = "Current Result:";
  }

  if (statusLines[4]) {
    statusLines[4].textContent = "Round Number:";
  }

  if (statusLines[5]) {
    statusLines[5].textContent = "Round Won by User:";
  }

  if (statusLines[6]) {
    statusLines[6].textContent = "Round Won by Computer:";
  }
}

function playRound(userChoice) {
  if (gameOver) {
    return;
  }

  const computerChoice = getComputerChoice();
  roundNumber += 1;

  let result = "It's a tie!";

  if (userChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (userChoice === "Rock" && computerChoice === "Scissors") ||
    (userChoice === "Paper" && computerChoice === "Rock") ||
    (userChoice === "Scissors" && computerChoice === "Paper")
  ) {
    userScore += 1;
    result = "You won this round!";
  } else {
    computerScore += 1;
    result = "Computer won this round!";
  }

  updateStatus(userChoice, computerChoice, result);

  if (userScore === 5 || computerScore === 5) {
    gameOver = true;
    const winner = userScore === 5 ? "Player" : "Computer";
    if (statusLines[3]) {
      statusLines[3].textContent = `${winner} is the winner!`;
    }
    showWinnerPopup(winner);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    playRound(button.textContent.trim());
  });
});

if (newGameButton) {
  newGameButton.addEventListener("click", resetGame);
}
