class Calculator {
  $PreviousPreview;
  $CurrentPreview;
  previousOperator = "";
  currentOperator = "";

  constructor($PreviousPreview, $CurrentPreview) {
    this.$PreviousPreview = $PreviousPreview;
    this.$CurrentPreview = $CurrentPreview;
  }
  onPressNumber(number) {
    // 점을 눌렀을 때는 합산하지 마라
    if (number === ".") {
      if (
      this.$CurrentPreview.textContent.length < 1 || 
      this.$CurrentPreview.textContent.includes(".")
      ) {
        return;
      }
    }
    this.$CurrentPreview.textContent += number;
  }

  handleMinus() {
    return (
      +this.$PreviousPreview.textContent.split(" ")[0] -
      +this.$CurrentPreview.textContent
    )
  }
  handlePlus() {
    return (
      +this.$PreviousPreview.textContent.split(" ")[0] +
      +this.$CurrentPreview.textContent
    )
  }
  handleMultiply() {
    return (
      +this.$PreviousPreview.textContent.split(" ")[0] *
      +this.$CurrentPreview.textContent
    )
  }
  handleDivide() {
    return (
      +this.$PreviousPreview.textContent.split(" ")[0] /
      +this.$CurrentPreview.textContent
    )
  }
  onEqual() {
    if (
      this.$CurrentPreview.textContent.length > 0 &&
      this.$PreviousPreview.textContent.length > 0 &&
      this.previousOperator.length > 0
    ) {
      let result = 0;
      switch (this.previousOperator) {
        case "+":
          result = this.handlePlus();
          break;
        case "-":
          result = this.handleMinus();
          break;
        case "*":
          result = this.handleMultiply();
          break;
        case "÷":
          result = this.handleDivide();
          break;
        default:
          break;
      }
      this.$CurrentPreview.textContent = result.toString();
      this.currentOperator = "";
      this.$PreviousPreview.textContent = "";
    }
  }

  onDelete() {
    if (this.$CurrentPreview.textContent.length > 0) {
      this.$CurrentPreview.textContent = this.$CurrentPreview.textContent.slice(0, -1);
    }
  }

  onReset() {
    this.$PreviousPreview.textContent = "";
    this.$CurrentPreview.textContent = "";
    this.previousOperator = "";
    this.currentOperator = "";
  }

  appendOperation(operation) {
    if (
      // 1. 현재 입력값 없고, 이전 입력값 있음
      (this.$CurrentPreview.textContent.length < 1 && 
        this.previousOperator.length > 0) || 
      // 2. 현재 입력값 있고, 이전 입력값 없음
      (this.$CurrentPreview.textContent.length > 0 && 
        this.$PreviousPreview.textContent.length < 1)
    ) {
      // 이미 계산 기호 존재시, 초기화
      if (this.previousOperator.length > 0) {
        this.$PreviousPreview.textContent = this.$PreviousPreview.textContent.split(" ")[0];
      }

      this.previousOperator = operation;
      this.$PreviousPreview.textContent += this.$CurrentPreview.textContent + " " + operation;
      this.$CurrentPreview.textContent = "";
    }
  }
}

const $PreviousPreview = document.querySelector("[data-previous-preview]");
const $CurrentPreview = document.querySelector("[data-current-preview]");

const $Minus = document.querySelector("[data-btn-minus]");
const $Plus = document.querySelector("[data-btn-plus]");
const $Multiply = document.querySelector("[data-btn-multiply]");
const $Divide = document.querySelector("[data-btn-divide]");

const $Reset = document.querySelector("[data-btn-reset]");
const $Delete = document.querySelector("[data-btn-delete]");
const $Equal = document.querySelector("[data-btn-equal]");

const $Numbers = document.querySelectorAll("[data-btn-number]");
const $Operations = document.querySelectorAll("[data-btn-operation]");

const calculator = new Calculator($PreviousPreview, $CurrentPreview);

$Numbers.forEach(($Number) => {
  $Number.addEventListener("click", (e) => {
    const number = e.target.textContent;
    calculator.onPressNumber(number);
  });
});

$Operations.forEach(($Operation) => {
  $Operation.addEventListener("click", (e) => {
    switch ($Operation) {
      case $Minus:
        calculator.appendOperation("-");
        break;
      case $Plus:
        calculator.appendOperation("+");
        break;
      case $Multiply:
        calculator.appendOperation("*");
        break;
      case $Divide:
        calculator.appendOperation("÷");
        break;
      case $Equal:
        calculator.onEqual();
        break;
      default:
        break;
    }
  });
});

$Reset.addEventListener("click", () => calculator.onReset());
$Delete.addEventListener("click", () => calculator.onDelete());
