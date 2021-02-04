function solve(obj) {

    if (!["GET", "POST", "DELETE", "CONNECT"].includes(obj.method)) {
        throw new Error("Invalid request header: Invalid Method");
    }

    if (obj.uri == undefined || !obj.uri.match(/^[\*\.0-9A-Za-z]+$/g)) {
        throw new Error("Invalid request header: Invalid URI");
    }

    if (!["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"].includes(obj.version)) {
        throw new Error("Invalid request header: Invalid Version");
    }

    if (obj.message || obj.message == undefined) {

        if (obj.message == undefined || !obj.message.match(/^[^<>\\&'"]+$/g)) {
            throw new Error("Invalid request header: Invalid Message");
        }
    }

    return obj;
}

solve({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});