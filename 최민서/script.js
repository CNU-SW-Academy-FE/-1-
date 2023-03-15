class Calculator {
    previousPreview;
    currentPreview;
    history;
    num1 = "";
    num2 = "";
    previousOperand = "";
    currentOperand = "";
    historyList = [];

    constructor(previousPreview, currentPreview, history) {
        this.previousPreview = previousPreview;
        this.currentPreview = currentPreview;
        this.history = history;
    }

    onPressNumber(number) {
        if (!this.num1) this.previousPreview.textContent = "";
        // 점('.')을 중복하여 눌렀을 때
        if (number === '.') {
            if (this.currentPreview.textContent.length < 1 || this.currentPreview.textContent.includes('.')) {
                return;
            }
        }
        this.num2 += number;
        this.currentPreview.textContent = this.num2;
    }

    handleMinus() {
        this.num1 = String(parseFloat(this.num1) - parseFloat(this.num2));
    }

    handlePlus() {
        this.num1 = String(parseFloat(this.num1) + parseFloat(this.num2));
    }

    handleMultiply() {
        this.num1 = String(parseFloat(this.num1) * parseFloat(this.num2));
    }

    handleDivide() {
        this.num1 = String(parseFloat(this.num1) / parseFloat(this.num2));
    }

    onEqual() {
        this.currentPreview.textContent = this.num1;
        // history 영역에 추가
        this.historyList.push({ expression: `${this.previousPreview.textContent}`, result: `${this.currentPreview.textContent}` });
        this.history.innerHTML = `
            ${this.historyList.map(hist => `
                <div style="border-top: 2px solid gray;">
                    <p style="opacity: .7;">${hist.expression}</p>
                    <p style="font-weight: bold; font-size: 16px;">${hist.result}</p>
                </div>
            `).join('')}
        `;
        // 필요한 변수 초기화
        this.num1 = "";
        this.num2 = "";
        this.previousOperand = "";
        this.currentOperand = "";
    }

    onDelete() {
        // 1. 입력한 숫자의 길이가 1일 때
        if (this.currentPreview.textContent.length === 1) {
            this.currentPreview.textContent = ""
        }
        // 2. 입력한 숫자의 길이가 1보다 클 때
        else {
            this.currentPreview.textContent = this.currentPreview.textContent.slice(0, -1);
        }
    }

    onReset() {
        this.previousPreview.textContent = "";
        this.currentPreview.textContent = "";
        this.num1 = "";
        this.num2 = "";
        this.previousOperand = "";
        this.currentOperand = "";
    }

    appendOperation(operator) {
        // 숫자가 입력되기 전에 연산자 입력 시, alert
        if (!this.currentPreview.textContent) {
            alert("숫자부터 입력해주세요.");
            this.onReset();
            return;
        }
        // 이전 식의 결괏값을 이용하여 계산하려는 경우
        else {
            if (!this.num1 && !this.num2 && !this.previousOperand && !this.currentOperand) {
                this.previousPreview.textContent = "";
                this.num1 = this.currentPreview.textContent;
            }
        }

        this.previousOperand = this.currentOperand;
        this.currentOperand = operator;

        // 피연산자 설정
        if (!this.num1) {
            this.num1 = this.num2;
            this.num2 = "";
        }

        // 두 개의 피연산자와 하나의 연산자가 모두 존재할 경우, 연산자 종류에 따라 계산
        if (this.previousOperand && this.num1 && this.num2) {
            switch (this.previousOperand) {
                case '÷':
                    this.handleDivide();
                    break;
                case '*':
                    this.handleMultiply();
                    break;
                case '-':
                    this.handleMinus();
                    break;
                case '+':
                    this.handlePlus();
                    break;
                default:
                    break;
            }
            this.num2 = "";
        }

        this.previousPreview.textContent += (this.currentPreview.textContent + " " + this.currentOperand + " ");
        
        if (this.currentOperand === '=') this.onEqual(); // 현재 연산자가 '='인 경우, onEqual() 호출
        else this.currentPreview.textContent = "";
    }

}

// display DOM element
const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-current-preview]");

// reset & delete DOM element
const $btnReset = document.querySelector("[data-btn-reset]");
const $btnDelete = document.querySelector("[data-btn-delete]");

// operation DOM element
const $btnOperations = document.querySelectorAll("[data-btn-operation]");

// number DOM element
const $btnNumbers = document.querySelectorAll("[data-btn-number]");

// equal DOM element
const $btnEqual = document.querySelector("[data-btn-equal]");

// history DOM element
const $history = document.querySelector(".history");

// Calculator 객체 생성
const calculator = new Calculator($previousPreview, $currentPreview, $history);

// 숫자 클릭
$btnNumbers.forEach((number) => {
    number.addEventListener('click', e => {
        const num = e.target.textContent;
        calculator.onPressNumber(num);
    });
});

// 연산자('+', '-', '*', '÷', '=') 클릭
$btnOperations.forEach((operation) => {
    operation.addEventListener('click', e => {
        calculator.appendOperation(e.target.textContent);
    });
});

// 초기화 클릭
$btnReset.addEventListener('click', () => {
    calculator.onReset();
});

// 지우기 클릭
$btnDelete.addEventListener('click', () => {
    calculator.onDelete();
})