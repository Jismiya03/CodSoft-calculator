const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;
        const displayValue = display.textContent;
        const operatorKeys = ['+', '-', 'x', '/', '=', '%'];

        if (keyValue === 'C') {
            display.textContent = '0';
        } else if (keyValue === 'DEL') {
            if (displayValue.length > 1) {
                display.textContent = displayValue.slice(0, -1);
            } else {
                display.textContent = '0';
            }
        } else if (keyValue === '=') {
            try {
                let expression = displayValue.replace(/x/g, '*').replace(/÷/g, '/');
                let percentageHandledExpression = expression.replace(/(\d+)%/g, '($1/100)');

                // Check for division by zero
                if (percentageHandledExpression.includes('/0')) {
                    throw new Error('Division by zero');
                }

                display.textContent = eval(percentageHandledExpression);
            } catch (error) {
                if (error.message === 'Division by zero') {
                    display.textContent = 'Error';
                } else {
                    display.textContent = 'Error';
                }
            }
        } else if (keyValue === '%') {
            display.textContent += '%';
        } else if (operatorKeys.includes(keyValue) || keyValue === '(' || keyValue === ')') {
            if (operatorKeys.includes(displayValue.slice(-1))) {
                display.textContent = displayValue.slice(0, -1) + keyValue;
            } else {
                display.textContent += keyValue;
            }
        } else {
            if (displayValue === '0') {
                display.textContent = keyValue;
            } else {
                display.textContent += keyValue;
            }
        }
    });
});
