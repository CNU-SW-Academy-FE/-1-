// 계산기 객체
class Calculator {
  constructor(operand1, operand2) {
    this.operand1 = operand1;
    this.operand2 = operand2;
  }


  plus() {
    return this.operand1 + this.operand2;
  }

  minus() {    
    return this.operand1 - this.operand2;
  }

  divide() { 
    return this.operand1 / this.operand2;
  }

  multiply() {    
    return this.operand1 * this.operand2;
  }
}

// 버튼 element들
const $number_buttons = document.querySelectorAll('.number-button');
const $operator_buttons = document.querySelectorAll('.operator-button');
const $parenthesis_buttons = document.querySelectorAll('.parenthesis-button');
const $delete_button = document.querySelector('#delete-button');
const $clear_button = document.querySelector('#clear-button');

// 현재 계산식
const $cal_previous_preview = document.getElementsByClassName('cal-previous-preview')[0];
// 현재 계산 결과값
const $cal_current_preview = document.getElementsByClassName('cal-current-preview')[0];
 
let cal_previous_preview = parseInt($cal_previous_preview.innerText);

const operators = ['+', '-', '*', '÷'];
const parenthesises = ['(', ')'];

let inputs = [];
let lastInput;
let parenthesis_array = []; // 괄호 저장할 배열
let clickCaculate = 0; // 0: not equal click, 1: equal click 

$number_buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    // equal 클릭으로 결과값 계산 후에 숫자 클릭 시 0부터 새로 계산
    if(clickCaculate === 1){
      clickCaculate = 0;

      $cal_previous_preview.innerText = '';
      $cal_current_preview.innerText = 0;
    }

    let number = parseInt(e.target.innerText);

    // 마지막 입력값
    lastInput = $cal_previous_preview.innerText.slice($cal_previous_preview.innerText.length-1, $cal_previous_preview.innerText.length);
    
    // 숫자와 괄호/연산자 구분을 위해 마지막 입력값에 따라 띄어쓰기로 구분
    if(operators.includes(lastInput) || parenthesises.includes(lastInput)) {
      $cal_previous_preview.innerText += ' ' + number;
    } else{
      $cal_previous_preview.innerText += number;
    }
  })
});

$operator_buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    // equal 클릭으로 결과값 계산 후에 연산자 클릭 시 결과값에 이어서 계산
    if(clickCaculate === 1){
      $cal_previous_preview.innerText = $cal_current_preview.innerText;
      clickCaculate = 0;
    }

    lastInput = $cal_previous_preview.innerText.slice($cal_previous_preview.innerText.length-1, $cal_previous_preview.innerText.length);
    // 올바른 계산식이 아닐 경우 안내 문구 띄우기
    if(operators.includes(lastInput) || parenthesis_array.includes(lastInput) || lastInput === ''){
      alert('올바른 계산식이 아닙니다. 계산식을 다시 입력해주세요.');
      
      parenthesis_array = [];
      $cal_previous_preview.innerText = '';
    } else{
      let operator = e.target.innerText;
      $cal_previous_preview.innerText += ' ' + operator;
    } 
  })
});

$parenthesis_buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let parenthesis = e.target.innerText;  
      // 올바른 계산식이 아닐 경우 안내 문구 띄우기
      if(parenthesis === '('){
        lastInput = $cal_previous_preview.innerText.slice($cal_previous_preview.innerText.length-1, $cal_previous_preview.innerText.length);
        
        if(lastInput !== '' && !parenthesis_array.includes(lastInput) && !operators.includes(lastInput)){
          alert('올바른 계산식이 아닙니다. 계산식을 다시 입력해주세요.');

          parenthesis_array = [];
          $cal_previous_preview.innerText = '';
          $cal_current_preview.innerText = 0;
        } else{
          if(parenthesis_array.length === 0) {
            parenthesis_array.push(parenthesis);
            $cal_previous_preview.innerText += ' ' + parenthesis;
          } else{
            alert('올바른 계산식이 아닙니다. 계산식을 다시 입력해주세요.');
            
            parenthesis_array = [];
            $cal_previous_preview.innerText = '';
            $cal_current_preview.innerText = 0;
          }
        }
      } else{
        if(parenthesis_array.length === 0) {
          alert('올바른 계산식이 아닙니다. 계산식을 다시 입력해주세요.');
          parenthesis_array = [];
          $cal_previous_preview.innerText = '';
          document.getElementsByClassName('cal-current-preview')[0].innerText = 0;
        } else{
          $cal_previous_preview.innerText += ' ' + parenthesis;
          parenthesis_array.pop();
        }
      }
    
    
  })
});

let result = 0;
let stack = []; // 후기 표기법에 따른 연산을 위한 배열
let cal = ''; // 후위 표기법 계산식
const $result_button = document.getElementById('result-button');

$result_button.addEventListener('click', () => {
  clickCaculate = 1;
  inputs = $cal_previous_preview.innerText.split(' ');
  
  // 후위 표기법에 따라 배열에 피연산자 및 연산자 저장
  inputs.forEach(element => {
    if(element === '('){
      stack.push(element);
    } else if(element === ')'){
      let stack_top = stack.pop();
      
      while(stack_top !== '('){
        cal += ' ' + stack_top;
        stack_top = stack.pop();
      }
    } else if(operators.includes(element)){
      if(stack.length === 0 || stack[stack.length-1] === '('){ 
        stack.push(element);
      } else {
        if(['*', '/'].includes(stack[stack.length-1])){
          cal += ' ' + stack.pop();
          stack.push(element);
        } else{
          if(['*', '/'].includes(element)){
            stack.push(element);
          } else {
            cal += ' ' + stack.pop();
            stack.push(element);
          }
        }
      }
    } else{
      cal += ' ' + element;
    }
  });

  while(stack.length > 0) {
    cal += ' ' + stack.pop();
  }

  
  const backwardExpression = cal.split(' ');

  // 후위표기법 계산식 연산하기
  backwardExpression.forEach((element, index) => {
    
    if(!operators.includes(element)){
      if(index !== 0){
        stack.push(element);
      }
    } else{
      let operand1 = parseInt(stack.pop());
      let operand2 = parseInt(stack.pop());

      let caculator = new Calculator(operand2, operand1);

      let result = 0;
      if(element === '+'){
        result = caculator.plus();
      } else if(element === '-'){
        result = caculator.minus();
      } else if(element === '*'){
        result = caculator.multiply();
      } else if(element === '÷'){
        result = caculator.divide();
      }
      stack.push(result);
    }
  })

  // 연산 결과 띄우고 연산에 사용했던 배열 등 비우기
  $cal_current_preview.innerText = stack[0];
  inputs = [];
  stack = [];
  cal = '';
})

$clear_button.addEventListener('click', () => {
  $cal_current_preview.innerText = 0;
  $cal_previous_preview.innerText = '';
})

$delete_button.addEventListener('click', () => {
  $cal_previous_preview.innerText = $cal_previous_preview.innerText.slice(0, $cal_previous_preview.innerText.length-1);
}) 