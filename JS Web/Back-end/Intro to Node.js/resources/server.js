const http = require("http");
const port = 5000;
const handlers = require("./handlers");

http.createServer(requestHandler)
    .listen(port, () => console.log(`Server is listening on port ${port}...`));

function requestHandler(req, res) {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}