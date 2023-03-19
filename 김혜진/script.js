class Calculator{
  elePreviousPreview;
  eleCurrentPreview;
  previousOperand;
  currentOperand;
  operation;
  flag = 0;

  constructor(elePreviousPreview, eleCurrentPreview){
    this.elePreviousPreview = elePreviousPreview;
    this.eleCurrentPreview = eleCurrentPreview;
  }

  onPressNumber(number){
    if(this.flag === 1){
      this.eleCurrentPreview.textContent = '';
      this.flag = 0;
    }

    if ( number === '.'){
      if(this.eleCurrentPreview.textContent.length < 1 ||
        this.eleCurrentPreview.textContent.includes(".")
      ){
        return;
      }
    }
    this.eleCurrentPreview.textContent += number;
  }

  handleMinus(){
    this.eleCurrentPreview.textContent = this.previousOperand - this.currentOperand;
  }

  handlePlus(){
    this.eleCurrentPreview.textContent = this.previousOperand + this.currentOperand;
  }

  handleMultiply(){
    this.eleCurrentPreview.textContent = this.previousOperand * this.currentOperand;
  }

  handleDivide(){
    this.eleCurrentPreview.textContent = this.previousOperand / this.currentOperand;
  }
  onEqual(){
    this.currentOperand = Number(this.eleCurrentPreview.textContent);
    switch(this.operation){
      case '-':
        this.handleMinus();
        break;
      case '+':
        this.handlePlus();
        break;
      case '*':
        this.handleMultiply();
        break;
      case '÷':
        this.handleDivide();
        break;
      default:
        break;
    }
    this.elePreviousPreview.textContent = '';
    this.flag = 1;
  }

  onDelete(){
    const str = this.eleCurrentPreview.textContent;
    this.eleCurrentPreview.textContent = str.substring(0, str.length-1);
  }

  onReset(){
    this.elePreviousPreview.textContent = '';
    this.eleCurrentPreview.textContent = '';
    this.previousOperand = '';
    this.currentOperand='';
    this.operation='';
  }

  appendOperation(operation){
    this.operation = operation;
    this.previousOperand = Number(this.eleCurrentPreview.textContent);
    this.eleCurrentPreview.textContent = '';
    this.elePreviousPreview.textContent += this.previousOperand;
    this.elePreviousPreview.textContent += operation;
    this.flag = 1;
  }
}

const elePreviousPreview = document.querySelector("[data-previous-preview]");
const eleCurrentPreview = document.querySelector("[data-current-preview]");


const eleDivide = document.querySelector("[data-btn-divide]");
const eleMinus = document.querySelector("[data-btn-minus]");
const elePlus = document.querySelector("[data-btn-plus]");
const eleMultiply = document.querySelector("[data-btn-multiply]");

const eleReset = document.querySelector("[data-btn-reset]");
const eleDelete = document.querySelector("[data-btn-delete]");
const eleEqual = document.querySelector("[data-btn-equal]");

const eleOperations = document.querySelectorAll("[data-btn-operation]");
const eleNumbers = document.querySelectorAll("[data-btn-number]");

const calculator = new Calculator(elePreviousPreview, eleCurrentPreview);

eleNumbers.forEach( eleNumber =>{
  eleNumber.addEventListener("click", (e)=>{
    calculator.onPressNumber(e.target.textContent);
  })
})

eleOperations.forEach( eleOperation =>{
  eleOperation.addEventListener("click", (e)=>{
    switch(eleOperation){
      case eleMinus:
        calculator.appendOperation(e.target.textContent);
        break;
      case elePlus:
        calculator.appendOperation(e.target.textContent);
        break;
      case eleMultiply:
        calculator.appendOperation(e.target.textContent);
        break;
      case eleDivide:
        calculator.appendOperation(e.target.textContent);
        break;
      case eleEqual:
        calculator.onEqual();
        break;
      default:
        break;
    }
    console.log(eleOperation);
  })
})

eleReset.addEventListener("click", (e)=>{
  calculator.onReset();
})

eleDelete.addEventListener("click", (e)=>{
  calculator.onDelete();
})
