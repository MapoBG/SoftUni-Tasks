function encodeAndDecodeMessages() {
    document.querySelectorAll('div > button')[0].addEventListener('click', encodeAndSend);
    document.querySelectorAll('div > button')[1].addEventListener('click', decodeAndRead);

    const inputEl = document.querySelectorAll('div > textarea')[0];
    const outputEl = document.querySelectorAll('div > textarea')[1];

    function encodeAndSend() {
        const message = inputEl.value;
        let encodedMsg = "";

        for (let i = 0; i < message.length; i++) {
            let char = message[i].charCodeAt();
            char++;
            char = String.fromCharCode(char);
            encodedMsg += char;
        }

        outputEl.value = encodedMsg;
        inputEl.value = "";
    }

    function decodeAndRead() {
        const encodedMsg = outputEl.value;
        let message = "";

        for (let i = 0; i < encodedMsg.length; i++) {
            let char = encodedMsg[i].charCodeAt();
            char--;
            char = String.fromCharCode(char);
            message += char;
        }
        outputEl.value = message;
    }
}