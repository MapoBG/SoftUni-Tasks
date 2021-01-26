function generateReport() {
    const tableHeadersEls = Array.from(document.querySelectorAll("tr th"));
    const tableRowsEls = Array.from(document.querySelectorAll("tbody tr"));

    const checkedHeadersIndex = [];
    const result = [];

    tableHeadersEls.forEach((th, index) => {

        if (th.firstElementChild.checked) {
            checkedHeadersIndex.push(index);
        }
    });

    tableRowsEls.forEach((tr) => {
        const tableData = Array.from(tr.children);
        const currentResult = {};

        tableData.forEach((cell, i) => {
            if (checkedHeadersIndex.includes(i)) {
                Object.assign(currentResult, { [tableHeadersEls[i].firstElementChild.name]: cell.textContent })
            }
        });

        result.push(currentResult);
    });

    document.getElementById("output").textContent = JSON.stringify(result);
}