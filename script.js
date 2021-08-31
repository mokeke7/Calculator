let num1;
let num2;
let ops;
let isCalculated = false;
let isContinued = false;
let result;
let button = document.querySelectorAll("button.number");
let btnId;


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
let opeId;
opeBtn.forEach((opeBtn) => {
  opeBtn.addEventListener("click", (e) => {
    opeId = document.getElementById(opeBtn.id);
    opeId.style.animation = "glowingOps 200ms";
    removeStyle(opeId);
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
  clear();
})

// Add button
let addBtn = document.querySelector("#add");
let addId = document.getElementById("add");
addBtn.addEventListener("click", (e) => {
  operator(addId, add, "+");
})

// Subtract button
let subBtn = document.querySelector("#subtract");
let subId = document.getElementById("subtract");
subBtn.addEventListener("click", (e) => {
  operator(subId, subtract, "-");
})

let multiBtn = document.querySelector("#multiply");
let multiId = document.getElementById("multiply");
multiBtn.addEventListener("click", (e) => {
  operator(multiId, multiply, "*");
})

let divBtn = document.querySelector("#divide");
let divId = document.getElementById("divide");
divBtn.addEventListener("click", (e) => {
  operator(divId, divide, "/");
})

let eqlBtn = document.querySelector("#equal");
eqlBtn.addEventListener("click", (e) => {
  let intNo = output.innerHTML.replace(/\s/g, '')
  let indexOps;
  switch (ops) {
    case "+":
      indexOps = intNo.search(/\+/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = add(num1, num2);
      addId.classList.remove("active");
      break;
    case "-":
      indexOps = intNo.search(/\-/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = subtract(num1, num2);
      subId.classList.remove("active");
      break;
    case "*":
      indexOps = intNo.search(/\*/);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = multiply(num1, num2);
      multiId.classList.remove("active");
      break;
    case "/":
      indexOps = intNo.search(/\//);
      num2 = parseInt(intNo.slice(indexOps + 1));
      output.innerHTML = divide(num1, num2);
      divId.classList.remove("active");
      break;
    }
  isCalculated = true;
  num1 = "";
  num2 = "";
})

function clear() {
  output.innerHTML = "";
}

// Operate
function operator(id, fun, ope) {
  id.classList.add("active");
  if (!num1) {
    num1 = parseInt(output.innerHTML);
  }
  else {
    num2 = parseInt(output.innerHTML);
  }
  clear();

  if (num1 && num2) {
    result = fun(num1, num2);
    num1 = result;
    checkResult(result, fun);
    isContinued = true;
  }
  ops = ope;
}

// Check if the result is over 8 digits
function checkResult(result, fun) {
  let length = result.toString().length
  if (isNan(result)) {
    output.innerHTML = "Error";
  }
  else if (fun == multiply && length >= 9) {
    output.innerHTML = "E"
  }
  else if (length >= 9) {
    output.innerHTML = result.toFixed(11);
  }
  else {
    output.innerHTML = result;
  }
}

