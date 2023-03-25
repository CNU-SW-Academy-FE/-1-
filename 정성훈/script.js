class Calculator {
  $previousPreview;
  $currentPreview;
  operandStack;
  operatorStack;
  operatorPriority = {
    "+": 2,
    "-": 2,
    "*": 1,
    "÷": 1,
  };
  restartFlag;

  constructor($previousPreview, $currentPreview) {
    this.$previousPreview = $previousPreview;
    this.$currentPreview = $currentPreview;
    this.operandStack = [];
    this.operatorStack = [];
    this.restartFlag = false;
  }

  handleCalculation(previousOperand, currentOperand, operator) {
    switch (operator) {
      case "*":
        return previousOperand * currentOperand;
      case "÷":
        return previousOperand / currentOperand;
      case "+":
        return previousOperand + currentOperand;
      case "-":
        return previousOperand - currentOperand;
      default:
        break;
    }
  }

  onPressNumber(number) {
    if (this.restartFlag) {
      this.$currentPreview.textContent = "";
      this.restartFlag = false;
    }
    if (number === ".") {
      if (this.$currentPreview.textContent.length === 0) {
        this.$currentPreview.textContent += "0.";
      }
      if (!this.$currentPreview.textContent.includes(".")) {
        this.$currentPreview.textContent += ".";
      }
      return;
    }
    this.$currentPreview.textContent += number;
  }

  onEqual() {
    while (this.operatorStack.length > 0) {
      const curOperand = this.operandStack.pop();
      const prevOperand = this.operandStack.pop();
      const operator = this.operatorStack.pop();
      this.operandStack.push(
        this.handleCalculation(prevOperand, curOperand, operator)
      );
      this.$previousPreview.textContent = "";
      this.$currentPreview.textContent = this.operandStack.pop();
      this.restartFlag = true;
    }
  }

  onDelete() {
    const currentPreviewText = this.$currentPreview.textContent;
    this.$currentPreview.textContent = currentPreviewText.substr(
      0,
      currentPreviewText.length - 1
    );
  }

  onReset() {
    this.$previousPreview.textContent = "";
    this.$currentPreview.textContent = "";
    this.operandStack = [];
    this.operatorStack = [];
  }

  calculateStack(currentOperand, currentOperator) {
    const previousOperator = this.operatorStack[this.operandStack.length - 1];
    if (
      this.operatorPriority[currentOperator] >=
      this.operatorPriority[previousOperator]
    ) {
      const calculation = this.handleCalculation(
        this.operandStack.pop(),
        Number(currentOperand),
        previousOperator
      );
      this.operatorStack.pop();
      this.operandStack.push(calculation);
      this.operatorStack.push(currentOperator);
    } else {
      this.operandStack.push(Number(currentOperand));
      this.operatorStack.push(currentOperator);
    }
  }

  appendOperation(operation) {
    operation = operation.trim();
    const currentOperand = this.$currentPreview.textContent;

    if (operation === "=") {
      if (currentOperand === "") {
        const lastWord =
          this.$previousPreview.textContent[
            this.$previousPreview.textContent.length - 1
          ];
        if (lastWord === "*" || lastWord === "÷") {
          this.operandStack.push(1);
        } else {
          this.operandStack.push(0);
        }
      } else {
        this.operandStack.push(Number(currentOperand));
      }
      this.onEqual();
      return;
    }

    if (currentOperand === "") {
      this.$previousPreview.textContent += "0" + operation;
    } else {
      this.$previousPreview.textContent += Number(currentOperand) + operation;
    }
    this.$currentPreview.textContent = "";
    this.calculateStack(currentOperand, operation);
  }
}

const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-current-preview]");

const $minus = document.querySelector("[data-btn-minus]");
const $plus = document.querySelector("[data-btn-plus]");
const $multiply = document.querySelector("[data-btn-multiply]");
const $divide = document.querySelector("[data-btn-divide]");

const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");
const $equal = document.querySelector("[data-btn-equal]");

const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");

const calculator = new Calculator($previousPreview, $currentPreview);

$numbers.forEach(($number) => {
  $number.addEventListener("click", (e) => {
    const number = e.target.textContent;
    calculator.onPressNumber(number);
  });
});

$operations.forEach(($operation) => {
  $operation.addEventListener("click", (e) => {
    switch ($operation) {
      case $minus:
        calculator.appendOperation(e.target.textContent);
        break;
      case $plus:
        calculator.appendOperation(e.target.textContent);
        break;
      case $minus:
        calculator.appendOperation(e.target.textContent);
        break;
      case $multiply:
        calculator.appendOperation(e.target.textContent);
        break;
      case $divide:
        calculator.appendOperation(e.target.textContent);
        break;
      case $equal:
        calculator.appendOperation(e.target.textContent);
        break;
      default:
        break;
    }
  });
});

$reset.addEventListener("click", () => calculator.onReset());
$delete.addEventListener("click", () => calculator.onDelete());
