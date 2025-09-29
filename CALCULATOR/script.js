        class Calculator {
            constructor() {
                this.display = document.getElementById('display');
                this.operationDisplay = document.getElementById('operation-display');
                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForNewInput = false;
                
                this.initializeEventListeners();
                this.updateDisplay();
            }

            initializeEventListeners() {
                // Number buttons
                document.querySelectorAll('.number-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        this.inputNumber(button.dataset.number);
                    });
                });

                // Operator buttons
                document.getElementById('add').addEventListener('click', () => this.inputOperator('+'));
                document.getElementById('subtract').addEventListener('click', () => this.inputOperator('-'));
                document.getElementById('multiply').addEventListener('click', () => this.inputOperator('*'));
                document.getElementById('divide').addEventListener('click', () => this.inputOperator('/'));

                // Special buttons
                document.getElementById('equals').addEventListener('click', () => this.calculate());
                document.getElementById('clear').addEventListener('click', () => this.clear());
                document.getElementById('decimal').addEventListener('click', () => this.inputDecimal());

                // Keyboard support
                document.addEventListener('keydown', (e) => this.handleKeyboard(e));
            }

            inputNumber(num) {
                if (this.waitingForNewInput) {
                    this.currentInput = num;
                    this.waitingForNewInput = false;
                } else {
                    this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
                }
                this.updateDisplay();
            }

            inputOperator(nextOperator) {
                const inputValue = parseFloat(this.currentInput);

                if (this.previousInput === '') {
                    this.previousInput = inputValue;
                } else if (this.operator) {
                    const currentValue = this.previousInput || 0;
                    const newValue = this.performCalculation(this.operator, currentValue, inputValue);

                    this.currentInput = String(newValue);
                    this.previousInput = newValue;
                    this.updateDisplay();
                }

                this.waitingForNewInput = true;
                this.operator = nextOperator;
                this.updateOperationDisplay();
            }

            inputDecimal() {
                if (this.waitingForNewInput) {
                    this.currentInput = '0.';
                    this.waitingForNewInput = false;
                } else if (this.currentInput.indexOf('.') === -1) {
                    this.currentInput += '.';
                }
                this.updateDisplay();
            }

            calculate() {
                const inputValue = parseFloat(this.currentInput);

                if (this.previousInput !== '' && this.operator) {
                    const newValue = this.performCalculation(this.operator, this.previousInput, inputValue);
                    
                    this.currentInput = String(newValue);
                    this.previousInput = '';
                    this.operator = null;
                    this.waitingForNewInput = true;
                    this.updateDisplay();
                    this.updateOperationDisplay();
                }
            }

            performCalculation(operator, firstValue, secondValue) {
                switch (operator) {
                    case '+':
                        return firstValue + secondValue;
                    case '-':
                        return firstValue - secondValue;
                    case '*':
                        return firstValue * secondValue;
                    case '/':
                        if (secondValue === 0) {
                            alert('Cannot divide by zero!');
                            return firstValue;
                        }
                        return firstValue / secondValue;
                    default:
                        return secondValue;
                }
            }

            clear() {
                this.currentInput = '0';
                this.previousInput = '';
                this.operator = null;
                this.waitingForNewInput = false;
                this.updateDisplay();
                this.updateOperationDisplay();
            }

            updateDisplay() {
                const displayValue = this.currentInput.length > 12 
                    ? parseFloat(this.currentInput).toExponential(5)
                    : this.currentInput;
                
                this.display.value = displayValue;
            }

            updateOperationDisplay() {
                if (this.operator && this.previousInput !== '') {
                    const operatorSymbols = {
                        '+': '+',
                        '-': '−',
                        '*': '×',
                        '/': '÷'
                    };
                    this.operationDisplay.textContent = `${this.previousInput} ${operatorSymbols[this.operator]}`;
                } else {
                    this.operationDisplay.textContent = '';
                }
            }

            handleKeyboard(e) {
                if (e.key >= '0' && e.key <= '9') {
                    this.inputNumber(e.key);
                } else if (e.key === '+') {
                    this.inputOperator('+');
                } else if (e.key === '-') {
                    this.inputOperator('-');
                } else if (e.key === '*') {
                    this.inputOperator('*');
                } else if (e.key === '/') {
                    e.preventDefault();
                    this.inputOperator('/');
                } else if (e.key === '=' || e.key === 'Enter') {
                    this.calculate();
                } else if (e.key === '.' || e.key === ',') {
                    this.inputDecimal();
                } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                    this.clear();
                } else if (e.key === 'Backspace') {
                    if (this.currentInput.length > 1) {
                        this.currentInput = this.currentInput.slice(0, -1);
                    } else {
                        this.currentInput = '0';
                    }
                    this.updateDisplay();
                }
            }
        }

        // Initialize calculator when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new Calculator();
        });