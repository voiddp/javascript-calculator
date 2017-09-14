function attachListeners () {
  "use strict";
  
  const userInputScreen = document.querySelector(".userInputScreen");
  const digitBtns = document.querySelectorAll(".digitBtn");
  const operatorBtns = document.querySelectorAll(".operatorBtn");

  // need to add listener for '.' value

  Array.from(digitBtns).forEach( btn => {
    btn.addEventListener("click", function () {

      const inputArr = userInputScreen.value.split(" ");

      if (userInputScreen.value === "0") {
        userInputScreen.value = "";
      };

      //  if last inputArr item is NaN, add a space
      if (isNaN(inputArr[inputArr.length - 1])) {
        userInputScreen.value = userInputScreen.value + " " + this.innerText;
      } else {
        userInputScreen.value = userInputScreen.value + this.innerText;
      }

    });
  });

  Array.from(operatorBtns).forEach( btn => {
    btn.addEventListener("click", function () {

      const inputArr = userInputScreen.value.split(" ");

      if (userInputScreen.value === "") return;
      // return if last value in inputArr is an operator
      if (isNaN(inputArr[inputArr.length - 1])) return;

      userInputScreen.value = userInputScreen.value + " " + this.innerText;
    });
  });

  document.querySelector(".calcBtn")
    .addEventListener("click", calculate);

  document.querySelector(".cancelBtn")
    .addEventListener("click", cancel);

  document.querySelector(".clearEntryBtn")
    .addEventListener("click", clearEntry);
}

function calculate () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");
  let result = 0;

  // return if last value in inputArr is an operator
  if (isNaN(inputArr[inputArr.length - 1])) return;

  // convert numbers in inputArr to Number data type?

  // the odd index numbers will be operators
  // calc in groups of 3 (accumulator, operator & val following operator)
  result = inputArr.reduce( (accumulator, val, index) => {
    "use strict";

    // check if index is odd, if so value will be an operator
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

  userInputScreen.value = null;
  userInputScreen.placeholder = 0;
}

// clears last user entry
function clearEntry () {
  "use strict";

  const userInputScreen = document.querySelector(".userInputScreen");
  const inputArr = userInputScreen.value.split(" ");

  if (userInputScreen.value === null) return;

  inputArr.splice(inputArr.length - 1, 1);
  userInputScreen.value = inputArr.join(" ");
}

// call attach event listeners function
attachListeners ();
