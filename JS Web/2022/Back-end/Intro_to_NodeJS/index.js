const http = require("http");
const port = 5555;

const handlers = require("./handlers/interface");

http.createServer((req, res) => {
    handlers(req, res);
}
).listen(port, () => console.log(`Server is listening on port ${port}`));