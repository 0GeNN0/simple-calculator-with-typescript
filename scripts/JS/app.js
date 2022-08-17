"use strict";
class Calculator {
    constructor(currentTextElement, previousTextElement) {
        this.currentTextElement = currentTextElement;
        this.previousTextElement = previousTextElement;
        this.currentText = "";
        this.previousText = "";
    }
    clearAll() {
        this.currentText = "";
        this.previousText = "";
        this.operator = undefined;
        this.updateUI();
    }
    deleteNumber() {
        this.currentText = this.currentText.slice(0, -1);
        this.updateUI();
    }
    handleOperators(operator) {
        if (this.operator) {
            if (!this.currentText)
                return;
            this.compute();
            this.operator = operator;
            this.previousText = `${this.currentText} ${operator}`;
            this.currentText = "";
            this.updateUI();
        }
        else {
            this.operator = operator;
            this.previousText = `${this.currentText} ${operator}`;
            this.currentText = "";
            this.updateUI();
        }
    }
    appendNumber(value) {
        if (value === "." && this.currentText.includes("."))
            return;
        this.currentText += value;
        this.updateUI();
    }
    compute() {
        switch (this.operator) {
            case "*":
                this.currentText = (parseFloat(this.previousText) * parseFloat(this.currentText)).toString();
                this.previousText = "";
                this.operator = undefined;
                break;
            case "÷":
                this.currentText = (parseFloat(this.previousText) / parseFloat(this.currentText)).toString();
                this.previousText = "";
                this.operator = undefined;
                break;
            case "+":
                this.currentText = (parseFloat(this.previousText) + parseFloat(this.currentText)).toString();
                this.previousText = "";
                this.operator = undefined;
                break;
            case "-":
                this.currentText = (parseFloat(this.previousText) - parseFloat(this.currentText)).toString();
                this.previousText = "";
                this.operator = undefined;
                break;
            default:
                return;
        }
    }
    updateUI() {
        this.currentTextElement.innerHTML = this.currentText;
        this.previousTextElement.innerHTML = this.previousText;
    }
}
const numbersButtons = document.querySelectorAll("[data-numbers]");
const operatorsButtons = document.querySelectorAll("[data-operators]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const myCalculator = new Calculator(currentTextElement, previousTextElement);
numbersButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        myCalculator.appendNumber(btn.innerHTML);
    });
});
operatorsButtons.forEach((operatorEl) => {
    operatorEl.addEventListener("click", () => {
        myCalculator.handleOperators(operatorEl.innerHTML);
    });
});
equalsButton.addEventListener("click", () => {
    myCalculator.compute();
    myCalculator.updateUI();
});
clearAllButton.addEventListener("click", () => {
    myCalculator.clearAll();
});
deleteButton.addEventListener("click", () => {
    myCalculator.deleteNumber();
});
