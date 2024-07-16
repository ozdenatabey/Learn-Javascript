const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//GETTING USER INPUT
function getUserNumberInput() {
  return +userInput.value;
}

//GENERATING CALCULATION PAST TO UI
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

//GENERATING CALCULATION LOGS
function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let calcSymbol;
  switch (calculationType) {
    case "ADD":
      currentResult = currentResult + enteredNumber;
      calcSymbol = "+";
      break;
    case "SUBTRACT":
      currentResult = currentResult - enteredNumber;
      calcSymbol = "-";
      break;
    case "MULTIPLY":
      currentResult = currentResult * enteredNumber;
      calcSymbol = "*";
      break;
    case "DIVIDE":
      currentResult = currentResult / enteredNumber;
      calcSymbol = "/";
      break;
  }
  createAndWriteOutput(calcSymbol, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

//BUTTONS ARE WORKING NOW
addBtn.addEventListener("click", calculateResult.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculateResult.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculateResult.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculateResult.bind(this, "DIVIDE"));
