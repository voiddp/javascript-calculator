function attachListeners () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
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
  const btnValue = clickEvent.currentTarget.textContent;
  const lastValue = inputArr[inputArr.length - 1];

  if (userInputScreen.value === "0") {
    userInputScreen.value = "";
  };

  //  if last inputArr item is NaN, add a space
  if (isNaN(lastValue)) {
    userInputScreen.value = userInputScreen.value + " " + btnValue;
  } else {
    userInputScreen.value = userInputScreen.value + btnValue;
  }
}

function operatorBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];

  if (userInputScreen.value === "" || isNaN(lastValue) || lastValue[lastValue.length -1] === ".") return;

  userInputScreen.value = userInputScreen.value + " "
    + clickEvent.currentTarget.textContent;
}

function decimalPntBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  const btnValue = clickEvent.currentTarget.textContent;

  if (userInputScreen.value === "" || isNaN(lastValue) || isNaN(lastValue + btnValue)) return;

  userInputScreen.value = userInputScreen.value
    + clickEvent.currentTarget.textContent;
}

function calculate () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  let result = 0;

  if (isNaN(lastValue) || lastValue === "." || lastValue[lastValue.length -1] === ".") return;

  // the odd index numbers will be operators
  // calc in groups of 3 (accumulator, operator & val following operator)
  result = inputArr.reduce( (accumulator, val, index) => {
    "use strict";

    // check if index is odd, if so value will be an operator,
    // and calculation can be performed
    if (index % 2 !== 0) {
      switch (val) {
        case "+":
          return Number(accumulator) + Number(inputArr[index + 1]);
          break;
        case "-":
          return Number(accumulator) - Number(inputArr[index + 1]);
          break;
        case "x":
          return Number(accumulator) * Number(inputArr[index + 1]);
          break;
        case "÷":
          return Number(accumulator) / Number(inputArr[index + 1]);
          break;
        default:
          // throw error?
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

  // update the calculator screen
  inputArr.splice(inputArr.length - 1, 1);
  userInputScreen.value = inputArr.join(" ");
}

// switch last value entered on calculator screen to either negative or positive
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

  // update the calculator screen
  userInputScreen.value = inputArr.splice(inputArr.length - 1, 1, lastValue);
  userInputScreen.value = inputArr.join(" ");
}

// call attach event listeners function
attachListeners ();
