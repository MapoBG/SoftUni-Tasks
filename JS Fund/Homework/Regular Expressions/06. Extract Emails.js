function getEmails(input) {
    let validEmails = input[0].match(/(^|(?<=\s))(([a-zA-Z0-9]+)([\.\-_]?)([A-Za-z0-9]+)(@)([a-zA-Z]+([\.\-_][A-Za-z]+)+))(\b|(?=\s))/g);
    if (validEmails) {
        console.log(validEmails.join("\n"));
    } else {
        validEmails = [];
    }
}
getEmails(['Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.'])