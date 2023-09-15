function keepFirstNumber(e, numberString) {
  if (/\d/.test(calculatorScreen.textContent)) {
    if (numberString[numberString.length - 1] === '.') { // If the last char of my number is . -> remove it
      numberString = numberString.slice(0, -1);
    }
    historyScreen.textContent = numberString + " " + e.target.textContent;
    calculatorScreen.textContent = '';
  }
}

function calculate(a, b, operator) {
  let result;
  switch(operator) {
    case '+':
      result = (a + b).toFixed(5);
      break;
    case '-':
      result = (a - b).toFixed(5);
      break;
    case 'x':
      result = (a * b).toFixed(5);
      break;
    case '/':
      result = (a / b).toFixed(5);
      break;
  }
  if (result.length < 15) {
    calculatorScreen.textContent = parseFloat(result);
  } else {
    calculatorScreen.textContent = parseFloat(result).toExponential(8);
  }
  historyScreen.textContent = '';
}

const numbersButtons = document.querySelectorAll(".numbers > .cell");
const calculatorScreen = document.querySelector(".result");
const historyScreen = document.querySelector(".history");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operatorsButtons = document.querySelectorAll(".operators div:not(.exclude)")
const equalButton = document.querySelector(".equal");


numbersButtons.forEach(button => button.addEventListener('click', (e) => {
  if(calculatorScreen.textContent.length < 15 && // If it's not too long
    !/e/.test(calculatorScreen.textContent)) { // If it's not already an exponential
    switch (e.target.textContent) {
      case " - ":
        if (calculatorScreen.textContent === '') { // The '-' sign is only at the beginning
          calculatorScreen.textContent = '-';
        }
        break;
      case " . ":
        if (calculatorScreen.textContent === '') { // Add a 0 in front of it if first sign
          calculatorScreen.textContent += '0' + (e.target.textContent).trim();
          break;
        }
        if (/\./.test(calculatorScreen.textContent) ||    // Only one dot !
            calculatorScreen.textContent === '-') {       // And not just after the - sign
          break;
        }
      default:
        calculatorScreen.textContent += e.target.textContent.trim();
    }
  }
}));
clearButton.addEventListener('click', () => {
  calculatorScreen.textContent = '';
  historyScreen.textContent = '';
});
deleteButton.addEventListener('click', () => {
  calculatorScreen.textContent = calculatorScreen.textContent.slice(0, -1);
})
// Adding the current number in history for every operator clicked
operatorsButtons.forEach(button => button.addEventListener('click', (e) => {
  if(historyScreen.textContent === '') {
    keepFirstNumber(e, calculatorScreen.textContent);
  } else {
    calculate(Number(historyScreen.textContent.slice(0, -2)),
    Number(calculatorScreen.textContent),
    historyScreen.textContent.slice(-1));
    // If the result is gave by typing a second operator without typing equal, 
    // we keep the temp result in history and empty result screen (as the calculus continue)
    historyScreen.textContent = calculatorScreen.textContent + ' ' + e.target.textContent;
    calculatorScreen.textContent = '';
  }
  
}));
equalButton.addEventListener('click', () => // When I press equal, I pass :
  calculate(Number(historyScreen.textContent.slice(0, -2)), // The first number
  Number(calculatorScreen.textContent), // The second one
  historyScreen.textContent.slice(-1))); // The operator to calculate()