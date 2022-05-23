const http = require("http");
const port = 5555;

const handlers = require("./handlers/interface");

http.createServer((req, res) => {
    for (let handler of handlers) {

        if (!handler(req, res)) {
            break;
        }
    }
}
).listen(port, () => console.log(`Server is listening on port ${port}`));