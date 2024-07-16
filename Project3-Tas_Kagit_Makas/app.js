const startGameBtn = document.getElementById("start-game-btn");

const TAS = "TAŞ";
const KAGIT = "KAĞIT";
const MAKAS = "MAKAS";
const DEFAULT_USER_CHOICE = TAS;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER WINS";
const RESULT_COMPUTER_WINS = "COMPUTER WINS";

let gameIsRunning = false;

const getPlayerChoise = () => {
  const selection = prompt(`${TAS}, ${KAGIT} veya ${MAKAS}`, "").toUpperCase();
  if (selection !== TAS && selection !== KAGIT && selection !== MAKAS) {
    alert(`Hatalı giriş! Sizin için ${DEFAULT_USER_CHOICE}'ı seçtik.`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomNumber = Math.random();
  if (randomNumber < 0.34) {
    return TAS;
  } else if (randomNumber < 0.67) {
    return KAGIT;
  } else {
    return MAKAS;
  }
};

const getWinner = (pChoise, cChoise) => {
  if (pChoise === cChoise) {
    return RESULT_DRAW;
  } else if (
    (pChoise === TAS && cChoise === MAKAS) ||
    (pChoise === KAGIT && cChoise === TAS) ||
    (pChoise === MAKAS && cChoise === KAGIT)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting........");
  const playerSelection = getPlayerChoise();
  const computerSelection = getComputerChoice();
  const winner = getWinner(playerSelection, computerSelection);
  let message = `Sizin seçiminiz ${playerSelection}, bilgisayarın seçimi ${computerSelection}\n`;
  if (winner === RESULT_DRAW) {
    message += "-----BERABERE-----";
  } else if (winner === RESULT_PLAYER_WINS) {
    message += "-----SİZ KAZANDINIZ-----";
  } else {
    message += "-----KAYBETTİNİZ-----";
  }
  alert(message);
  gameIsRunning = false;
});
