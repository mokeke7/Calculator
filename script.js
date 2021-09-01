let num1;
let num2;
let ops;
let isCalculated = false;
let isContinued = false;
let result;
let button = document.querySelectorAll("button.number");
let btnId;

// Add function
function add(num1, num2) {
  if (isNaN(num1)) {
    return num2;
  } else if (isNaN(num2)) {
    return num1;
  }
  else {
    return num1 + num2;
  }
}

// Subtract function
function subtract(num1, num2) {
  if (isNaN(num1)) {
    return num2;
  } else if (isNaN(num2)) {
    return num1;
  }
  else {
    return num1 - num2;
  }
}

// Multiply function
function multiply(num1, num2) {
  if (isNaN(num1)) {
    return num2;
  } else if (isNaN(num2)) {
    return num1;
  }
  else {
    return num1 * num2;
  }
}

// Divide function
function divide(num1, num2) {
  if (isNaN(num1)) {
    return num2;
  } else if (isNaN(num2)) {
    return num1;
  }
  else {
    return num1 / num2;
  }
}

// Display the numbers and add animation
// If num1 is not null, clear the display
// if the first number is 0, don't repeat
button.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (isCalculated || isContinued) {
      clear();
      isContinued = false;
      isCalculated = false;
    }
    btnId = document.getElementById(button.id);
    btnId.style.animation = "glowingNum 200ms";
    removeStyle(btnId);
    let output = document.querySelector("#output");
    if (output.innerHTML.replace(/\s/g, '') == "0") {
      clear();
    }
      if (output.innerHTML.replace(/\s/g, '').length < 8) {
        output.innerHTML += button.id;
      }
  })
})

// Add animation to ops btn
let opeBtn = document.querySelectorAll("button.ops");
let test = '';
opeBtn.forEach((opeBtn) => {
  opeBtn.addEventListener("click", (e) => {
    removeActive();
    if (opeBtn.id == "equal") {
      opeBtn.style.animation = "glowingOps 200ms";
      removeStyle(opeBtn);
    }
    else {
      opeBtn.classList.add("active");
    }

    if (!num1) {
      num1 = parseInt(output.innerHTML);
      test = opeBtn.id;
      clear();
    }
    else {
      num2 = parseInt(output.innerHTML);
      result = calc(test, num1, num2);
      checkResult(result, test);
      num1 = result;
      test = opeBtn.id;
    }
    isContinued = true;
  })
})

// Remove style.animation from clicked btn
function removeStyle(id) {
  setTimeout(() => {
    id.style.animation = "";
  }, 200);
}

// Clear the output
let acBtn = document.querySelector("#clear");
acBtn.addEventListener("click", (e) => {
  acBtn.style.animation = "glowingOps 200ms";
  removeStyle(acBtn);
  clear();
})

// Add button
let addBtn = document.querySelector("#add");
let addId = document.getElementById("add");

// Subtract button
let subBtn = document.querySelector("#subtract");
let subtractId = document.getElementById("subtract");

// Multiply button
let multiBtn = document.querySelector("#multiply");
let multiplyId = document.getElementById("multiply");

// Divide button
let divBtn = document.querySelector("#divide");
let divideId = document.getElementById("divide");

// Equal button
let eqlBtn = document.querySelector("#equal");
eqlBtn.addEventListener("click", (e) => {
  let intNo = output.innerHTML.replace(/\s/g, '')
  let indexOps;
  switch (ops) {
    case "+":
      indexOps = intNo.search(/\+/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = add(num1, num2);
      removeActive();
      break;
    case "-":
      indexOps = intNo.search(/\-/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = subtract(num1, num2);
      removeActive();
      break;
    case "*":
      indexOps = intNo.search(/\*/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = multiply(num1, num2);
      removeActive();
      break;
    case "/":
      indexOps = intNo.search(/\//);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = divide(num1, num2);
      removeActive();
      break;
    }
  isCalculated = true;
  num1 = "";
  num2 = "";
})

function clear() {
  if (output.innerHTML != null) {
    output.innerHTML = "";
  }

}

// Check if the result is over 8 digits
function checkResult(result, fun) {
  let length = result.toString().length
  if (isNaN(result)) {
    output.innerHTML = "Error";
  }
  else if (fun == "multiply" && length >= 9) {
    output.innerHTML = "E"
  }
  else if (length >= 9) {
    output.innerHTML = result.toFixed(11);
  }
  else {
    output.innerHTML = result;
  }
}

function isActive(){
  let active = document.querySelectorAll("button.active")
  if (active == null){
    return false;
  }
  else {
    return true;
  }
}

function removeActive(){
  addId.classList.remove("active");
  subtractId.classList.remove("active");
  multiplyId.classList.remove("active");
  divideId.classList.remove("active");
}

function calc(f, num1, num2) {
  switch (f) {
    case "add":
      return add(num1, num2);
      break;
    case "subtract":
      return subtract(num1, num2);
      break;
    case "multiply":
      return multiply(num1, num2);
      break;
    case "divide":
      return divide(num1, num2);
      break;
  }
}