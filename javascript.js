function attachListeners () {
  "use strict";

  const digitBtns = document.querySelectorAll(".digitBtn");
  const operatorBtns = document.querySelectorAll(".operatorBtn");

  Array.from(digitBtns).forEach( btn => {
    btn.addEventListener("click", digitBtn);
  });

  Array.from(operatorBtns).forEach( btn => {
    btn.addEventListener("click", operatorBtn);
  });

  document.querySelector(".decimalPnt")
    .addEventListener("click", decimalPntBtn);

  document.querySelector(".calcBtn")
    .addEventListener("click", calculate);

  document.querySelector(".cancelBtn")
    .addEventListener("click", cancel);

  document.querySelector(".clearEntryBtn")
    .addEventListener("click", clearEntry);

  document.querySelector(".converter")
    .addEventListener("click", convert);
}

function digitBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  const btnValue = clickEvent.currentTarget.textContent;

  if (userInputScreen.value === "0") {
    userInputScreen.value = "";
  };

  //  if the last inputArr item is an operator or a decimal point (i.e. NaN),
  //  add a space
  if (isNaN(lastValue)) {
    userInputScreen.value = userInputScreen.value + " " + btnValue;
  } else {
    userInputScreen.value = userInputScreen.value + btnValue;
  }

  userInputScreen.focus();
}

function operatorBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];

  if (userInputScreen.value === ""
    || isNaN(lastValue)
    || lastValue[lastValue.length -1] === ".") return;

  userInputScreen.value = userInputScreen.value + " "
    + clickEvent.currentTarget.textContent;

  userInputScreen.focus();
}

function decimalPntBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  const btnValue = clickEvent.currentTarget.textContent;

  if (userInputScreen.value === ""
    || isNaN(lastValue)
    || isNaN(lastValue + btnValue)) return;

  userInputScreen.value = userInputScreen.value
    + clickEvent.currentTarget.textContent;

  userInputScreen.focus();
}

function calculate () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  let result = 0;
  let nxtValue = 0;

  if (isNaN(lastValue)
    || lastValue === "."
    || lastValue[lastValue.length -1] === ".") return;

  // the odd index numbers will be operators
  // calculate in groups of 3 (accumulator, operator & val following operator)
  result = inputArr.reduce( (accumulator, operator, index) => {
    "use strict";

    // value following the operator
    nxtValue = inputArr[index + 1];

    // check if index is odd, if so value will be an operator,
    // and calculation can be performed
    if (index % 2 !== 0) {
      switch (operator) {
        case "+":
          return Number(accumulator) + Number(nxtValue);
          break;
        case "-":
          return Number(accumulator) - Number(nxtValue);
          break;
        case "x":
          return Number(accumulator) * Number(nxtValue);
          break;
        case "÷":
          return Number(accumulator) / Number(nxtValue);
          break;
        default:
          return;
      }
    } else return accumulator;
  });

  // display result on calculator screen
  userInputScreen.value = result;
}

// clears calculator screen
function cancel () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");

  userInputScreen.value = "";
  userInputScreen.placeholder = 0;
}

// clears last user entry
function clearEntry () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");

  if (userInputScreen.value === "") return;

  // remove the last element in the array of values entered by the user
  inputArr.splice(inputArr.length - 1, 1);
  // update the calculator screen
  userInputScreen.value = inputArr.join(" ");

  userInputScreen.focus();
}

// switch the last value entered on calculator screen to either negative,
 // or positive
function convert () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  let lastValue = inputArr[inputArr.length - 1];

  if (userInputScreen.value === "" || isNaN(lastValue)) return;

  // check if last value is neg or pos, change accordingly
  if (lastValue > 0) {
    // add "-"
    lastValue = "-" + lastValue;
  } else {
    // remove "-"
    lastValue = lastValue.substr(1);
  }

  // replace the last element in the array of values entered by the user
  // with the newly converted value
  inputArr.splice(inputArr.length - 1, 1, lastValue);
  // update the calculator screen
  userInputScreen.value = inputArr.join(" ");

  userInputScreen.focus();
}

// call attach event listeners function
attachListeners ();
