function solve() {

    return {
        init(selector1, selector2, resultSelector) {
            let firstElement = document.getElementById(selector1);
            let secondElement = document.getElementById(selector2);
            let resultElement = document.getElementById(resultSelector);
        },
        add() {
            this.resultElement.textContent = this.firstElement.textContent + this.secondElement.textContent;
            return this.resultElement;
        },
        subtract() {
            this.resultElement.textContent = this.secondElement.textContent - this.firstElement.textContent;
            return this.resultElement;
        }
    }
}

