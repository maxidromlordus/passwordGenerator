"use strict";

console.log("init"); //

var lowCase = "abcdefghijklmnopqrstuvwxyz";
var upCase = lowCase.toLocaleUpperCase();
var numbers = "1234567890";
console.log(upCase);
var simb = "~`!@#$%^&*()_-+={[}]|:;<,>.?/"; // basic function to generate random numbers

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
} // Function to replace alphabetic chars with special chars


var replaceSpecialChar = function replaceSpecialChar(pass) {
  var passLenght = pass.length;
  var passPosition = getRandomInt(0, passLenght - 1);
  var specialCharPossition = getRandomInt(0, simb.length - 1);
  var selectedChar = simb[specialCharPossition];
  pass[passPosition] = selectedChar;
  console.log("replaced ".concat(passPosition, " char"));
}; // main function to generate password


var generatePass = function generatePass() {
  var genPass = "";
  var charsLenght = document.getElementsByName("lenght");
  var checkedValue = undefined;
  var valuePromise = new Promise(function (resolve, reject) {
    for (var i = 0; i < charsLenght.length; i++) {
      if (charsLenght[i].checked) {
        checkedValue = charsLenght[i].value;
      }
    }

    resolve(checkedValue);
  });
  valuePromise.then(function (result) {
    for (var i = 0; i < +result; i++) {
      var ch = getRandomInt(0, lowCase.length - 3);
      genPass += lowCase[ch];
    }

    return new Promise(function (resolve) {
      var arrayPass = genPass.split("");
      resolve(arrayPass);
    });
  }).then(function (result) {
    var withSimbols = document.querySelector(".simbols");

    if (withSimbols.checked) {
      for (var i = 0; i < 3; i++) {
        replaceSpecialChar(result);
      }

      var finalResult = result.join("");
      var displayResult = document.querySelector(".generated-text");
      displayResult.value = finalResult;
      var text = displayResult.innerText;
      displayResult.focus();
      displayResult.select();
      displayResult.blur();
      document.execCommand("copy");
    } else {
      var _finalResult = result.join("");

      var _displayResult = document.querySelector(".generated-text");

      _displayResult.value = _finalResult;
      var _text = _displayResult.innerText;

      _displayResult.focus();

      _displayResult.select();

      _displayResult.blur();

      document.execCommand("copy");
    }
  }); //   if (checkedValue) {
  //
  // }
};

var generateButton = document.querySelector(".button");
generateButton.addEventListener("click", function () {
  generatePass();
});