const path = require("path");

function getPath(url) {
    return path.normalize(path.join(__dirname, url));
}

function errorHandler(err, res) {
    console.log(err);
    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.write("404 Not Found");
    res.end();
    return err;
}

function dataHandler(data, res, pathname) {
    res.writeHead(200, {
        "Content-Type": getContentType(pathname)
    });

    res.write(data);
    res.end();
    return data;
}

function getContentType(url) {
    if (url.endsWith("css")) {
        return "text/css";
    } else if (url.endsWith("ico")) {
        return "image/vnd.microsoft.icon";
    } else if (url.endsWith("js")) {
        return "text/javascript";
    } else if (url.endsWith("jpg") || url.endsWith("jpeg")) {
        return "image/jpeg";
    } else if (url.endsWith("json")) {
        return "application/json";
    } else if (url.endsWith("html")) {
        return "text/html";
    } else {
        return "text/html";
    }
}

module.exports = { getPath, errorHandler, dataHandler };