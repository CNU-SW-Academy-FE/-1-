class Calculator {
  $previousPreview;
  $currentPreview;

  previousOperation = "";
  currentOperation = "";

  constructor($previousPreview, $currentPreview) {
    this.$previousPreview = $previousPreview;
    this.$currentPreview = $currentPreview;
  }

  onPressNumber(number) {
    if (number === "." && this.$currentPreview.textContent.length < 1) {
      return;
    }
    this.$currentPreview.textContent += number;
    console.log(this.$currentPreview.textContent);
  }

  onPressOperation(operation) {
    if ($currentPreview.textContent.length < 1) return;
    this.previousOperation = operation;

    this.$previousPreview.textContent += `${this.$currentPreview.textContent} ${operation} `;
    this.$currentPreview.textContent = "";
  }

  onEqual() {
    if (
      this.$currentPreview.textContent.length > 0 &&
      this.$previousPreview.textContent.length > 0 &&
      this.previousOperation.length > 0
    ) {
      let result = 0;
      switch (this.previousOperation) {
        case "+":
          result = this.handlePlus();
          break;
        case "-":
          result = this.handleMinus();
          break;
        case "×":
          result = this.handleMultiply();
          break;
        case "÷":
          result = this.handleDivide();
          break;
        default:
          break;
      }

      this.$currentPreview.textContent = result.toString();
      this.$previousPreview.textContent = "";
      this.currntOperation = "";
    }
  }

  handlePlus() {
    return (
      +this.$previousPreview.textContent.split(" ")[0] +
      +this.$currentPreview.textContent
    );
  }

  handleMinus() {
    return (
      +this.$previousPreview.textContent.split(" ")[0] -
      +this.$currentPreview.textContent
    );
  }

  handleMultiply() {
    return (
      +this.$previousPreview.textContent.split(" ")[0] *
      +this.$currentPreview.textContent
    );
  }

  handleDivide() {
    return (
      +this.$previousPreview.textContent.split(" ")[0] /
      +this.$currentPreview.textContent
    );
  }

  onReset() {
    this.$currentPreview.textContent = "";
    this.$previousPreview.textContent = "";
    this.previousOperation = "";
    this.currentOperation = "";
  }

  onDelete() {
    if (this.$currentPreview.textContent.length > 0) {
      this.$currentPreview.textContent = this.$currentPreview.textContent.slice(
        0,
        -1
      );
    }
  }
}

const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-currnet-preview]");
const $minus = document.querySelector("[data-btn-minus]");
const $plus = document.querySelector("[data-btn-plus]");
const $multiply = document.querySelector("[data-btn-multiply]");
const $divide = document.querySelector("[data-btn-divide]");
const $equal = document.querySelector("[data-btn-equal]");

const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");

const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");

$numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    console.log(e.target.textContent);
    const number = e.target.textContent;
    calculator.onPressNumber(number);
  });
});

$operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    switch (operation) {
      case $plus:
        calculator.onPressOperation("+");
        break;
      case $minus:
        calculator.onPressOperation("-");
        break;
      case $multiply:
        calculator.onPressOperation("×");
        break;
      case $divide:
        calculator.onPressOperation("÷");
        break;
      case $equal:
        calculator.onEqual();
        break;
      default:
        break;
    }
  });
});

$reset.addEventListener("click", (e) => {
  calculator.onReset();
});

$delete.addEventListener("click", (e) => {
  calculator.onDelete();
});

const calculator = new Calculator($previousPreview, $currentPreview);
