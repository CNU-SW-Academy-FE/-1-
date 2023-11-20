const $BtnOperations = document.querySelectorAll("[data-btn-operation]");
const $BtnNums = document.querySelectorAll("[data-btn-number]");
const $PreviousPreview = document.querySelector("[data-previous-preview]");
const $CurrentPreview = document.querySelector("[data-current-preview]");
const $BtnReset = document.querySelector("[data-btn-reset]");
const $BtnMultiply = document.querySelector("[data-btn-multiply]");
const $BtnMinus = document.querySelector("[data-btn-minus]");
const $BtnEqual = document.querySelector("[data-btn-equal]");
const $BtnPlus = document.querySelector("[data-btn-plus]");
const $BtnDivide = document.querySelector("[data-btn-divide]");
const $BtnDelete = document.querySelector("[data-btn-delete]");


class Calculator {
  $PreviousPreview;
  $CurrentPreview;
  previousPreview = "";
  currentPreview = "";
  operation = "";

  constructor($PreviousPreview, $CurrentPreview) {
    this.$PreviousPreview = $PreviousPreview;
    this.$CurrentPreview = $CurrentPreview;
  }

  onPressNumber(num) {
    if (num === ".") {
      return;
    }
    this.$CurrentPreview.textContent += num;
  }

  handleMinus(a, b) {
    this.$CurrentPreview.textContent = a - b;
    this.$PreviousPreview.textContent = "";
    this.operation = "";
  }

  handleMultiply(a, b) {
    this.$CurrentPreview.textContent = a * b;
    this.$PreviousPreview.textContent = "";
    this.operation = "";
  }

  handleDivide(a, b) {
    this.$CurrentPreview.textContent = a / b;
    this.$PreviousPreview.textContent = "";
    this.operation = "";
  }

  handlePlus(a, b) {
    this.$CurrentPreview.textContent = a + b;
    this.$PreviousPreview.textContent = "";
    this.operation = "";
  }

  onEqual() {
    if(!this.operation) {
      this.operation = operation;
      this.$PreviousPreview.textContent = this.$CurrentPreview.textContent + " " + operation;
      this.$CurrentPreview.textContent = "";
    } else if(this.operation === "-") {
      this.handleMinus(this.previousPreview, this.currentPreview);
    } else if(this.operation === "+") {
      this.handlePlus(this.previousPreview, this.currentPreview);
    } else if(this.operation === "*") {
      this.handleMultiply(this.previousPreview, this.currentPreview);
    } else if(this.operation === "÷") {
      this.handleDivide(this.previousPreview, this.currentPreview);
    }
  }

  onDelete() {
    this.$CurrentPreview.textContent = this.$CurrentPreview.textContent.slice(0, -1);
  }

  onReset() {
    this.$PreviousPreview.textContent = "";
    this.$CurrentPreview.textContent = "";
  
    this.previousPreview = "";
    this.currentPreview = "";
  }

  appendOperation(operation) {
    this.previousPreview = parseFloat(this.$PreviousPreview.textContent);
    this.currentPreview = parseFloat(this.$CurrentPreview.textContent);

    // 현재 들어와있는 연산자가 존재하지 않고 새로 들어온 연산자가 "="가 아닐 때
    if(!this.operation && operation !== "=") {
      this.operation = operation;
      this.$PreviousPreview.textContent = this.$CurrentPreview.textContent + " " + operation;
      this.$CurrentPreview.textContent = "";
    } 
    else if(this.operation === "-") {
      this.handleMinus(this.previousPreview, this.currentPreview);
    } 
    else if(this.operation === "+") {
      this.handlePlus(this.previousPreview, this.currentPreview);
    } 
    else if(this.operation === "*") {
      this.handleMultiply(this.previousPreview, this.currentPreview);
    } 
    else if(this.operation === "÷") {
      this.handleDivide(this.previousPreview, this.currentPreview);
    } 
    else if(this.operation === "=") {
      this.onEqual();
    }
  }
}

const newCalculator = new newCalculator($PreviousPreview, $CurrentPreview);

$BtnNums.forEach(($BtnNum) => {
  $BtnNum.addEventListener("click", (e) => {
    const num = e.target.textContent;
    newCalculator.onPressNumber(num);
  });
});

$BtnOperations.forEach(($BtnOperation) => {
  $BtnOperation.addEventListener("click", (e) => {
    switch ($BtnOperation) {
      case $BtnMinus:
        newCalculator.appendOperation(e.target.textContent);
        break;
      case $BtnPlus:
        newCalculator.appendOperation(e.target.textContent);
        break;
      case $BtnMultiply:
        newCalculator.appendOperation(e.target.textContent);
        break;
      case $BtnDivide:
        newCalculator.appendOperation(e.target.textContent);
        break;
      case $BtnEqual:
        newCalculator.appendOperation(e.target.textContent);
        break;
      default:
        newCalculator.appendOperation(e.target.textContent);
        break;
    }
  });
});

$BtnReset.addEventListener('click', () => {
  newCalculator.onReset();
})

$BtnDelete.addEventListener('click', () => {
  newCalculator.onDelete();
})
