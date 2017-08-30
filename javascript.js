function calculate () {
  "use strict";

  const userInput = document.querySelector(".userInput").value;
  // when an operator is inputted, add a space:
  // this is how we can tell if the value is (part of) a number, or an operator
  const inputArr = userInput.split(" ");
  let result = 0;

  // the odd index numbers will be operators
  // calc in groups of 3 (accumulator, operator & val following operator)
  // convert number to Number first?
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
        case "*":
          return Number(accumulator) * Number(inputArr[index + 1]);
          break;
        case "/":
          return Number(accumulator) / Number(inputArr[index + 1]);
          break;
        default:
        // throw error?
      }
    } else return accumulator;

  });

  console.log(result);

}

// validate input
function validate () {
  "use strict"

}

document.querySelector(".userInput")
  .addEventListener("input", validate);

document.querySelector(".calcBtn")
  .addEventListener("click", calculate);

// document.querySelectorAll(".digitBtn")
//   .addEventListener("click", function () {
//   console.log(this.innerText);
// });
