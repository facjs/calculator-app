'use strict';

// Variables
const clearButton = document.getElementById('clear__button');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');

const numbersButton = document.querySelectorAll('.number');
const operatorsButton = document.querySelectorAll('.operator');

const previousScreen = document.querySelector('.previous');
const currentScreen = document.querySelector('.current');

let operator = '';
let previousValue = '';
let currentValue = '';

// Functions
const handleNumber = (num) => {
    if (currentValue.length <= 10) {
        currentValue += num;
    }
};

const handleOperator = (op) => {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
};

const calculateResults = () => {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    let operatorInUse = operator;
    let result = '';

    switch (operatorInUse) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case 'x':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
    }

    previousScreen.textContent = '';
    currentScreen.textContent = roundNumbers(result);
    currentValue = result;
};

const roundNumbers = (num) => {
    return Math.round(num * 1000) / 1000;
};

// Event Listeners
numbersButton.forEach((number) => {
    number.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    });
});

operatorsButton.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
        previousScreen.textContent = `${previousValue} ${operator.textContent}`;
        currentScreen.textContent = currentValue;
    });
});

clearButton.addEventListener('click', () => {
    previousValue = '';
    currentValue = '';
    operator = '';
    previousScreen.textContent = '';
    currentScreen.textContent = '';
});

equalButton.addEventListener('click', () => {
    if (currentValue != '' && previousValue != '') {
        calculateResults();
    }
});
