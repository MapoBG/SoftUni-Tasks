// ==================WORKS IN BROWSER, BUT NOT IN JUDGE - 16/100!!!================================
function solve() {
    let bugList = [];
    let bugCounter = 0;
    let selector = undefined;
    return (function () {
        return {
            report(author, description, reproducible, severity) {
                bugList.push({
                    ID: bugCounter,
                    author,
                    description,
                    reproducible,
                    severity,
                    status: 'Open',
                });
                bugCounter++;
                if (selector) {
                    this.output();
                }
            },
            setStatus(id, newStatus) {
                bugList.forEach((report, index) => {
                    if (report.ID == id) {
                        bugList[index].status = newStatus;
                    }
                });
                if (selector) {
                    this.output();
                }
            },
            remove(id) {
                bugList.forEach((report, index) => {
                    if (report.ID == id) {
                        bugList.splice(index, 1);
                        bugCounter--;
                    }
                });
                if (selector) {
                    this.output();
                }
            },
            sort(method) {
                switch (method) {
                    case 'author':
                        bugList = bugList.sort((r1, r2) => r1.author.localeCompare(r2.author));
                        break;
                    case 'severity':
                        bugList = bugList.sort((r1, r2) => r1.severity - r2.severity);
                        break;
                    default:
                        bugList = bugList.sort((r1, r2) => r1.ID - r2.ID);
                        break;
                }
                if (selector) {
                    this.output();
                }
            },
            output(sel) {
                selector = sel;
                let htmlElement = document.querySelector(sel);
                bugList.forEach(report => {
                    let newDiv = document.createElement('div');
                    newDiv.id = `report_${report.ID}`
                    newDiv.classList = 'report';
                    newDiv.innerHTML = `  
                    <div class="body">
                    <p>${report.description}</p>
                    </div>
                    <div class="title">
                    <span class="author">Submitted by: ${report.author}</span>
                    <span class="status">${report.status} | ${report.severity}</span>
                    </div> `;
                    htmlElement.appendChild(newDiv);
                })
            },
        }
    })()
}

let tracker = solve();
tracker.report('kiwi', 'judge rip', true, 5);
tracker.report('wiki', 'judge', false, 10);
tracker.report('aki', 'judge me not', true, 7);
tracker.setStatus(0, "Closed");
tracker.sort('author');
tracker.sort('severity');
tracker.sort();
tracker.output('#content');
tracker.remove(0);