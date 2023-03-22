class Calculator{
    elPreviousPreview;
    elCurrentPreview;
    previousOperand;
    currentOperand;
    currentNumber;
    previousNumber;
    result;
    historyStack;
    elHistory;
    constructor(elPreviousPreview,elCurrentPreview,elHistory) {
        this.elCurrentPreview = elCurrentPreview;
        this.elPreviousPreview = elPreviousPreview;
        this.elHistory = elHistory;
        this.currentNumber = ''
        this.previousNumber = 0
        this.result = 0;
        this.historyStack = []
    }

    onPressNumber(number){
        if(number === '.') {
            if(this.elCurrentPreview.textContent.length < 1 || 
                this.elCurrentPreview.textContent.includes('.')
                ){
                    return;
                } 
        }
        this.currentNumber += number
        this.elCurrentPreview.textContent = this.currentNumber
    }

    handleMinus(){
        this.result = this.previousNumber - (+this.currentNumber)
        this.elCurrentPreview.textContent = this.result
        this.historyStack.push(this.result)
        let strTest = String(this.historyStack)
            
           
            this.elHistory.textContent = strTest.replace(/,/g, '\n');
    }
    handlePlus(){
        this.result = this.previousNumber + (+this.currentNumber)
        this.elCurrentPreview.textContent = this.result
        this.historyStack.push(this.result)
        let strTest = String(this.historyStack)
            
           
            this.elHistory.textContent = strTest.replace(/,/g, '\n');
    }
    handleMultiply(){
        this.result = this.previousNumber * (+this.currentNumber)
        this.elCurrentPreview.textContent = this.result
        this.historyStack.push(this.result)
        let strTest = String(this.historyStack)
            
           
            this.elHistory.textContent = strTest.replace(/,/g, '\n');

    }
    handleDivide(){
        this.result = this.previousNumber / (+this.currentNumber)
        this.elCurrentPreview.textContent = this.result
        this.historyStack.push(this.result)
        let strTest = String(this.historyStack)
            
           
            this.elHistory.textContent = strTest.replace(/,/g, '\n');

    }
    onEqual(){
        if(this.historyStack.length >= 1){
            this.previousNumber = this.result
            this.elCurrentPreview.textContent = this.result
           
            this.elPreviousPreview.textContent = this.previousNumber +" "+ this.currentOperand +" "+ this.currentNumber
            
            
            

        }
        else{
            
            this.elPreviousPreview.textContent = this.previousNumber +" "+ this.currentOperand +" "+ this.currentNumber
        }
        switch(this.currentOperand){
            case "-":
                this.handleMinus()
                break;
            case '+':
                this.handlePlus()
                break;
            case '*':
                this.handleMultiply()
                break;
            case '÷':
                this.handleDivide()
                break;
        }

    }
    onDelete(){
        this.currentNumber = this.currentNumber.slice(0,this.currentNumber.length-1)
        this.elCurrentPreview.textContent = this.currentNumber
    }
    onReset(){
        this.elPreviousPreview.textContent = '';
        this.elCurrentPreview.textContent = '';
        this.previousOperand = '';
        this.currentOperand = '';
        this.currentNumber = '';
        this.previousNumber = 0;
        this.result = 0;
        this.historyStack.splice(0);
        
    }
    appendOperation(oper){
        this.elPreviousPreview.textContent = ''
        this.currentOperand = oper
        this.elCurrentPreview.textContent += oper
        this.elPreviousPreview.textContent += this.elCurrentPreview.textContent;
        this.elCurrentPreview.textContent = '';
        this.previousNumber = +this.currentNumber;
        this.currentNumber = '';
    }
}



const elPreviousPreview = document.querySelector("[data-previous-preview]");
const elCurrentPreview = document.querySelector("[data-current-preview]");

const elReset = document.querySelector("[data-btn-reset]")
const elDelete = document.querySelector("[data-btn-delete]")

const elNumber = document.querySelectorAll("[data-btn-number]")


const elOperaters = document.querySelectorAll("[data-btn-operation]")
const elDivide = document.querySelector("[data-btn-divide]")
const elMultiply = document.querySelector("[data-btn-multiply]")
const elMinus = document.querySelector("[data-btn-minus]")
const elPlus = document.querySelector("[data-btn-plus]")
const elEqual = document.querySelector("[data-btn-equal]")
const elHistory = document.querySelector('.history')


const cal = new Calculator(elPreviousPreview, elCurrentPreview,elHistory);

elNumber.forEach((number) => {
    number.addEventListener('click', (e)=> {
        const number = e.target.textContent
        cal.onPressNumber(number)
        //console.log(number)
    })
})
elDelete.addEventListener('click', (e) => {
    cal.onDelete()
})



elOperaters.forEach((operater) =>{
    operater.addEventListener('click', (e) => {
        switch(operater){
            case elMinus:
                cal.appendOperation(e.target.textContent)
                break;
            case elPlus:
                cal.appendOperation(e.target.textContent)
                break;
            case elMultiply:
                cal.appendOperation(e.target.textContent)
                break;
            case elDivide:
                cal.appendOperation(e.target.textContent)
                break;
            case elEqual:
                
                cal.onEqual()
                
                break;
            default:
                break;
        }
        
    })
})

elReset.addEventListener('click', () => {cal.onReset()})