const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextEl = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-winning-message-btn]");

let isCircleTurn;

const winningCombinations = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  board.classList.add("x");
  winningMessage.classList.remove("show-winning-message");
};

const EndGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextEl.innerText = "Empate!";
  } else {
    winningMessageTextEl.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);

  const isDraw = checkForDraw();

  if (isWin) {
    EndGame(false);
  } else if (isDraw) {
    EndGame(true);
  } else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
