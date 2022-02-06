class Calculator {
    constructor(pretext, currtext) {
        this.pretext = pretext;
        this.currtext = currtext;
        this.clear();
    }

    clear() {
        this.curroprnd = '';
        this.preoprnd = '';
        this.opp = undefined;
    }

    delete() {
        if (this.opp != null && this.curroprnd === '') {
            this.opp = undefined;
            this.curroprnd = this.preoprnd;
            this.preoprnd = '';
        } else {
            this.curroprnd = this.curroprnd.toString().slice(0, -1);
        }
    }

    refresh() {
        if (this.curroprnd !== null && this.opp === undefined && this.should === undefined) {
            this.should = this.curroprnd;
            this.curroprnd = '';
        }
    }

    appendNum(number) {
        if (number === '.' && this.curroprnd.includes('.')) return;
        this.curroprnd = this.curroprnd.toString() + number.toString();
    }

    chooseopp(opp) {
        if (this.curroprnd === '') return;
        if (this.preoprnd !== '') {
            this.compute();
            this.updateDisplay();
        }
        this.opp = opp;
        this.preoprnd = parseFloat(this.curroprnd);
        this.curroprnd = '';
    }

    compute() {
        let result, dot = 0;
        const prev = parseFloat(this.preoprnd);
        const curr = parseFloat(this.curroprnd);
        if (isNaN(prev) || isNaN(curr)) return;
        if (prev.toString().includes('.')) {
            dot = prev.toString().split('.')[1].length;
        }
        if (curr.toString().includes('.')) {
            dot += curr.toString().split('.')[1].length;
        }
        switch (this.opp) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default: return;
        }
        if (this.opp !== '/') result = parseFloat(result.toFixed(dot));
        if (this.opp === '/') result = parseFloat(result.toFixed(3));
        this.curroprnd = result;
        this.opp = undefined;
        this.preoprnd = '';
        this.should = undefined;
    }

    getnum(number) {
        const stringNumber = number.toString();
        const int = parseFloat(stringNumber.split('.')[0]);
        const deci = stringNumber.split('.')[1];
        let display;
        if (isNaN(int)) {
            display = '';
        } else {
            display = int.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (deci != null) {
            return `${display}.${deci}`;
        } else {
            return display;
        }
    }

    updateDisplay() {
        this.currtext.innerText =
            this.getnum(this.curroprnd);
        if (this.opp != null) {
            this.pretext.innerText =
                `${this.getnum(this.preoprnd)} ${this.opp}`;
        } else {
            this.pretext.innerText = '';
        }
    }
}

numbut = document.getElementsByClassName("data-number");
oppbut = document.getElementsByClassName("data-operation");
equal = document.getElementById("data-equals");
del = document.getElementById("data-delete");
allclr = document.getElementById("data-all-clear");
pretext = document.getElementById("data-previous-operand");
currtext = document.getElementById("data-current-operand");

const calculator = new Calculator(pretext, currtext);

let yes = false;

for (item of numbut) {
    item.addEventListener('click', (e) => {
        text = e.target.innerText;
        calculator.refresh(text);
        calculator.appendNum(text);
        calculator.updateDisplay();
    })
}

for (item of oppbut) {
    item.addEventListener('click', (e) => {
        text = e.target.innerText;
        calculator.chooseopp(text);
        calculator.updateDisplay();
    })
}

equal.addEventListener("click", (e) => {
    text = e.target.innerText;
    calculator.compute();
    calculator.updateDisplay();
    yes = false;
})

allclr.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
})

del.addEventListener('click', btn => {
    calculator.refresh();
    calculator.delete();
    calculator.updateDisplay();
})


