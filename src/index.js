console.log("init"); //

let lowCase = "abcdefghijklmnopqrstuvwxyz";
let upCase = lowCase.toLocaleUpperCase();
let numbers = "1234567890";
console.log(upCase);
let simb = "~`!@#$%^&*()_-+={[}]|:;<,>.?/";

// basic function to generate random numbers
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
// Function to replace alphabetic chars with special chars
const replaceSpecialChar = function (pass) {
  const passLenght = pass.length;
  const passPosition = getRandomInt(0, passLenght - 1);
  const specialCharPossition = getRandomInt(0, simb.length - 1);
  const selectedChar = simb[specialCharPossition];

  pass[passPosition] = selectedChar;
  console.log(`replaced ${passPosition} char`);
};

// main function to generate password
const generatePass = function () {
  let genPass = "";
  const charsLenght = document.getElementsByName("lenght");
  let checkedValue = undefined;
  const valuePromise = new Promise((resolve, reject) => {
    for (let i = 0; i < charsLenght.length; i++) {
      if (charsLenght[i].checked) {
        checkedValue = charsLenght[i].value;
      }
    }
    resolve(checkedValue);
  });

  valuePromise
    .then((result) => {
      for (let i = 0; i < +result; i++) {
        const ch = getRandomInt(0, lowCase.length - 3);
        genPass += lowCase[ch];
      }
      return new Promise((resolve) => {
        let arrayPass = genPass.split("");
        resolve(arrayPass);
      });
    })
    .then((result) => {
      const withSimbols = document.querySelector(".simbols");
      if (withSimbols.checked) {
        for (let i = 0; i < 3; i++) {
          replaceSpecialChar(result);
        }
        let finalResult = result.join("");
        const displayResult = document.querySelector(".generated-text");
        displayResult.value = finalResult;
        const text = displayResult.innerText;
        displayResult.focus();
        displayResult.select();
        displayResult.blur();
        document.execCommand("copy");
      } else {
        let finalResult = result.join("");
        const displayResult = document.querySelector(".generated-text");
        displayResult.value = finalResult;
        const text = displayResult.innerText;
        displayResult.focus();
        displayResult.select();
        displayResult.blur();
        document.execCommand("copy");
      }
    });
  //   if (checkedValue) {
  //
  // }
};

const generateButton = document.querySelector(".button");
generateButton.addEventListener("click", () => {
  generatePass();
});
