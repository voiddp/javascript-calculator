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
  }

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

  if (userInputScreen.value === "" || isNaN(lastValue) || lastValue[lastValue.length -1] === ".") return;

  userInputScreen.value = userInputScreen.value + " " +
    clickEvent.currentTarget.textContent;

  userInputScreen.focus();
}

function decimalPntBtn (clickEvent) {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  const btnValue = clickEvent.currentTarget.textContent;

  if (userInputScreen.value === "" || isNaN(lastValue) || isNaN(lastValue + btnValue)) return;

  userInputScreen.value = userInputScreen.value +
    clickEvent.currentTarget.textContent;

  userInputScreen.focus();
}

function calculate () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  let inputArr = userInputScreen.value.split(" ");
  const lastValue = inputArr[inputArr.length - 1];
  let result = 0;
  let nxtValue = 0;

  if (isNaN(lastValue) || lastValue === "." || lastValue[lastValue.length -1] === ".") return;

  // if the bodmas rule needs to be implemented, call a function which will
  // return an array which conforms to the rule
  if (bodmasNeeded(inputArr)) {
    inputArr = orderOperations(inputArr);
  }

  // the odd index numbers will be operators
  // calculate in groups of 3 (accumulator, operator & val following operator)
  result = inputArr.reduce( (accumulator, operator, index) => {
    // value following the operator
    nxtValue = inputArr[index + 1];

    // check if index is odd, if so value will be an operator,
    // and calculation can be performed
    if (index % 2 !== 0) {
      switch (operator) {
        case "+": return Number(accumulator) + Number(nxtValue);
        case "-": return Number(accumulator) - Number(nxtValue);
        case "x": return Number(accumulator) * Number(nxtValue);
        case "÷": return Number(accumulator) / Number(nxtValue);
        default: return accumulator;
      }
    } else return accumulator;
  });

  // display result on calculator screen
  userInputScreen.value = result;
}

// return true if the bodmas rule needs to be implemented
function bodmasNeeded (inputArr) {
  "use strict";

  if ((inputArr.indexOf("x") !== -1 || inputArr.indexOf("÷") !== -1) &&
    (inputArr.indexOf("+") !== -1 || inputArr.indexOf("-") !== -1)) {
      return true;
    } else {
      return false;
    }
}

// implement BODMAS rules
function orderOperations (inputArr) {
  "use strict";

  let cleanedArr = [];
  let i = 0;
  const userInputScreen = document.querySelector(".userInputScreen");

  cleanedArr = inputArr;

  for (i = 0; i < cleanedArr.length; i++) {
    let val = "";
    let newVal = 0;

    if (!bodmasNeeded(cleanedArr)) return cleanedArr;

    val = cleanedArr[i];

    if (i % 2 !== 0 && (val === "x" || val === "÷")) {
      // if the current value is a multiplication or division operator,
      // perform that calcuation, and replace it in the array with the
      // return value - i.e. replace 3 values with a single value
      switch (val) {
        case "x":
          newVal = Number(cleanedArr[i - 1]) * Number(cleanedArr[i + 1]);
          cleanedArr.splice(i - 1, 3, newVal);
          break;
        case "÷":
          newVal = Number(cleanedArr[i - 1]) / Number(cleanedArr[i + 1]);
          cleanedArr.splice(i - 1, 3, newVal);
          break;
        default: userInputScreen.value = "Sorry, an error has occured";
      }
      // restart loop from the beginning of the altered array
      i = -1;
    }
  }

  return cleanedArr;
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
