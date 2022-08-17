class Calculator {
  currentText: string = "";
  previousText: string = "";
  operator: string | undefined;
  constructor(
    public currentTextElement: HTMLDivElement,
    public previousTextElement: HTMLDivElement
  ) {}

  clearAll(): void {
    this.currentText = "";
    this.previousText = "";
    this.operator = undefined;
    this.updateUI();
  }

  deleteNumber(): void {
    this.currentText = this.currentText.slice(0, -1);
    this.updateUI();
  }

  handleOperators(operator: string): void {
    if (this.operator) {
      if (!this.currentText) return;
      this.compute();
      this.operator = operator;
      this.previousText = `${this.currentText} ${operator}`;
      this.currentText = "";
      this.updateUI();
    } else {
      this.operator = operator;
      this.previousText = `${this.currentText} ${operator}`;
      this.currentText = "";
      this.updateUI();
    }
  }

  appendNumber(value: string): void {
    if (value === "." && this.currentText.includes(".")) return;

    this.currentText += value;
    this.updateUI();
  }

  compute(): void {
    switch (this.operator) {
      case "*":
        this.currentText = (
          parseFloat(this.previousText) * parseFloat(this.currentText)
        ).toString();
        this.previousText = "";
        this.operator = undefined;
        break;
      case "÷":
        this.currentText = (
          parseFloat(this.previousText) / parseFloat(this.currentText)
        ).toString();
        this.previousText = "";
        this.operator = undefined;
        break;
      case "+":
        this.currentText = (
          parseFloat(this.previousText) + parseFloat(this.currentText)
        ).toString();
        this.previousText = "";
        this.operator = undefined;
        break;
      case "-":
        this.currentText = (
          parseFloat(this.previousText) - parseFloat(this.currentText)
        ).toString();
        this.previousText = "";
        this.operator = undefined;
        break;
      default:
        return;
    }
  }

  updateUI(): void {
    this.currentTextElement.innerHTML = this.currentText;
    this.previousTextElement.innerHTML = this.previousText;
  }
}

const numbersButtons = document.querySelectorAll(
  "[data-numbers]"
) as NodeListOf<HTMLButtonElement>;

const operatorsButtons = document.querySelectorAll(
  "[data-operators]"
) as NodeListOf<HTMLButtonElement>;

const previousTextElement = document.querySelector(
  "[data-previous]"
) as HTMLDivElement;

const currentTextElement = document.querySelector(
  "[data-current]"
) as HTMLDivElement;

const equalsButton = document.querySelector(
  "[data-equals]"
) as HTMLButtonElement;

const deleteButton = document.querySelector(
  "[data-delete]"
) as HTMLButtonElement;

const clearAllButton = document.querySelector(
  "[data-clear-all]"
) as HTMLButtonElement;

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
