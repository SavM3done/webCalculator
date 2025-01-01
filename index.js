var display = "";


$(document).keypress((pressed) => {
  const validators = "+-/*=().Cc0";
  let pressedButton = pressed.key;

  if (pressedButton === "c") {
    pressedButton = "C";
  }

  console.log(pressedButton)
  if (parseInt(pressedButton) || validators.includes(pressedButton)) {
    calculatorSwitch(pressedButton, false);
    console.log(pressedButton)
  }
})


$("button").on("click",(clicked) => {
  calculatorSwitch(clicked, true);
})


function calculatorSwitch(event, button) {
  var switchVar = event;

  if (button) {
    switchVar = event.target.innerText
    buttonAnimation(event);
  }

  switch (switchVar) {
      case "=":
        calculateResult();
        break;

      case "x²":
        calculateResult("x²")
        break;

      case "()":
        enterParenthesys();
        break;

      case "C":
        clearDisplay();
        break;

      default:
        enterNumber(switchVar)
  }
}


function clearDisplay() {
  display = "";
  updateDisplay();
}


function enterNumber(num) {
  if (num === "−") {
    num = "-";
  }

  display += num;
  updateDisplay();
}


function enterParenthesys() {
  if (display.lastIndexOf("(") > display.lastIndexOf(")")) {
    display += ")";
  }

  else { 
    display += "(";
  }

  updateDisplay();
}


// Show result, otherwise "ERROR" with a timeout.
function calculateResult(button="") {
  try {

    switch (button) {

      case "x²":
        if (!Math.pow((eval(display)), 2)) {
          display = "";
        }

        else {
          display = Math.pow((eval(display)), 2);;
        }
        break;

      case "":
        display = eval(display);
        break;

    }
    updateDisplay();
  }

  catch(err) {
    $("input").attr("placeholder", "ERROR");

    display = "";
    setTimeout(function() {
      $("input").attr("placeholder", display)}, 1200);
  }
}


function updateDisplay() {
  $("input").attr("placeholder", display);
}


function buttonAnimation(button) {
  console.log(button)
  $(`#${button.target.id}`).addClass("clickedColor");

  setTimeout(function() {
    $(`#${button.target.id}`).removeClass("clickedColor")}, 150);
}