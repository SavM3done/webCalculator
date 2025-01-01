var display = "";


$(document).keypress((pressed) => {
  const validators = "+-/*=.0";
  let pressedButton = pressed.key;

  if (pressedButton === "c") {
    pressedButton = "C";
  }
  else if (pressedButton === ")") {
    pressedButton = "(";
  }

  switch (pressedButton) {
    case "=":
      calculateResult();
      break;

    case "x²":
      powResult();
      break;

    case "(":
      enterParenthesys();
      break;

    case"C":
      clearDisplay();
      break;

    default:
      if (parseInt(pressedButton) || validators.includes(pressedButton)) {
        enterValue(pressedButton, false);
      }
  }
})


function clearDisplay(idButton) {
  buttonAnimation(idButton);
  display = "";
  updateDisplay();
}


function enterParenthesys() {
  buttonAnimation("parenthesys");
  if (display.lastIndexOf("(") > display.lastIndexOf(")")) {
    display += ")";
  }

  else { 
    display += "(";
  }

  updateDisplay();
}


function enterValue(newValue, id=newValue) {
  buttonAnimation(id);
  display = display + newValue;
  updateDisplay();
}


function powResult() {
  buttonAnimation("pow");

  try {
    display = Math.pow((eval(display)), 2);
    updateDisplay();
    }
  catch {
    handleError();
  }  
}


function calculateResult() {
  buttonAnimation("equal");

  try {
    display = eval(display);
    updateDisplay();
    }
  catch {
    handleError();
  }
}


function updateDisplay() {
  $("input").attr("placeholder", display);
}


function buttonAnimation(idButton) {
  $(`#${idButton}`).addClass("clickedColor");

  setTimeout(function() {
    $(`#${idButton}`).removeClass("clickedColor")}, 150);
}


function handleError() {
  $("input").attr("placeholder", "ERROR");
  display = "";

  setTimeout(function() {
    $("input").attr("placeholder", display)}, 1200);
}
