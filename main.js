
class Calculator{
    constructor(previousOperandTextEl, curOperandTextEl) {
        this.previousOperandTextEl = previousOperandTextEl;
        this.curOperandTextEl = curOperandTextEl;
        this.clear();
    }

    clear() {
        this.curOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    del() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }
    
    appendNum(num) {
        if(num === '.' && this.curOperand.innerText.includes('.')){
            return;
        }
    
        this.curOperand = this.curOperand.toString() + num.toString();
    }
    
    chooseOperation(operation){
        if(this.curOperand === ''){
            return;
        }
    
        if(this.previousOperand !== ''){
            this.eval();
        }
    
        this.operation = operation;
        this.previousOperand = this.curOperand;
        this.curOperand = ''
    }
    
    eval() {
        let result;
    
        const prevNum = parseFloat(this.previousOperand);
        const curNum = parseFloat(this.curOperand);

        if(isNaN(prevNum) || isNaN(curNum)) {
            return;
        }

        switch(this.operation) {
            case '+':
                result = prevNum + curNum;
                break;
            case '-':
                result = prevNum - curNum;
                break;
            case'*':
                result = prevNum * curNum;
                break;
            case'÷':
                result = prevNum / curNum;
                break;
            default: 
                return;
        }

        this.curOperand = result;
        this.operand = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(num) {
        const stringNum = num.toString();

        const intergerDigits = parseFloat(stringNum.split('.'[0]));
        const decimalDigits = stringNum.split('.'[1]);

        let intergerDisplay;
        if(isNaN(intergerDigits)){
            intergerDisplay = '';
        } else{
            intergerDisplay = intergerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`;
        } else {
            return intergerDisplay;
        }
    }

    updateDisplay() {
        this.curOperandTextEl.innerText = this.curOperand;

        if(this.operand != null){
            this.previousOperandTextEl.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextEl.innerText = '';
        }
    }
}

//References to all the buttons

const numberBtns = document.querySelectorAll('.nums');
const operaterBtns = document.querySelectorAll('.operators');
const equalsBtn = document.querySelector('#equals');
const delBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');
const previousOperandTextEl = document.querySelector('.previous-operand');
const curOperandTextEl = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextEl, curOperandTextEl);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

operaterBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.eval();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

delBtn.addEventListener('click', button => {
    calculator.del();
    calculator.updateDisplay();
})