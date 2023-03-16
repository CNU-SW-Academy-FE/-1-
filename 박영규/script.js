const $BtnDivide = document.querySelector("[data-btn-divide]");
const $BtnOperations = document.querySelectorAll("[data-btn-operation]");
const $BtnNums = document.querySelectorAll("[data-btn-number]");
const $CurrentPreview = document.querySelector("[cal-current-preview]");
const $BtnReset = document.querySelector("[data-btn-reset]");
const $BtnMultiply = document.querySelector("[data-btn-multiply]");
const $BtnMinus = document.querySelector("[data-btn-minus]");
const $BtnEqual = document.querySelector("[data-btn-equal]");
const $BtnPlus = document.querySelector("[data-btn-plus]");
const $BtnDelete = document.querySelector("[data-btn-delete]");
const $PreviousPreview = document.querySelector("[data-previous-preview]");

class Calculator {
  $PreviousPreview;
  $CurrentPreview;

  constructor($PreviousPreview, $CurrentPreview) {
    this.$PreviousPreview = $PreviousPreview;
    this.$CurrentPreview = $CurrentPreview;
  }

  onPressNumber(num) {
    if (num === ".") {
      if (
        this.$CurrentPreview.textContent.length < 1 ||
        this.$CurrentPreview.textContent.includes(".")
      ) {
        return;
      }
    }
    this.$CurrentPreview.textContent += num;
  }

  handleMinus(a, b) {}

  handleMultiply(a, b) {}

  handleDivide(a, b) {}

  handlePlus(a, b) {}

  onEqual() {}

  onDelete() {}

  onReset() {}

  appendOperation() {}
}

const test = new Calculator($PreviousPreview, $CurrentPreview);

$BtnNums.forEach(($BtnNum) => {
  $BtnNum.addEventListener("click", (e) => {
    const num = e.target.textContent;
    test.onPressNumber(num);
  });
});

$BtnOperations.forEach(($BtnOperation) => {
  $BtnOperation.addEventListener("click", (e) => {
    switch ($BtnOperation) {
      case $BtnMinus:
        test.appendOperation();
        break;
      case $BtnPlus:
        test.appendOperation();
        break;
      case $BtnMultiply:
        test.appendOperation();
        break;
      case $BtnDivide:
        test.appendOperation();
        break;
      case $BtnEqual:
        test.appendOperation();
        break;
      default:
        test.appendOperation();
        break;
    }
  });
});
