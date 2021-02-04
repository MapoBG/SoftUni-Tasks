function validate() {
    const companyInfoEl = document.getElementById("companyInfo");
    const checkEl = document.getElementById("company");
    const validDivEl = document.getElementById("valid");

    checkEl.addEventListener("change", checkCompany);
    document.getElementById("submit").addEventListener("click", submitForm);

    function checkCompany() {
        if (checkEl.checked) {
            companyInfoEl.style.display = "block";
        } else {
            companyInfoEl.style.display = "none";
        }
    }

    function submitForm(e) {
        e.preventDefault();

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        const companyNumber = document.getElementById("companyNumber");

        if (!username.value.match(/^[A-Za-z0-9]{3,20}$/)) {
            username.style.borderColor = "red";
        } else {
            username.style.borderColor = "";
        }

        if (!password.value.match(/^\w{5,15}$/)) {
            password.style.borderColor = "red";
        } else {
            password.style.borderColor = "";
        }

        if (confirmPassword.value !== password.value || !password.value.match(/^\w{5,15}$/)) {
            confirmPassword.style.borderColor = "red";
            password.style.borderColor = "red";
        } else {
            confirmPassword.style.borderColor = "";
        }

        if (!email.value.match(/^.*@.*\..*$/)) {
            email.style.borderColor = "red";
        } else {
            email.style.borderColor = "";
        }

        if (checkEl.checked) {
            if (companyNumber.value > 999 && companyNumber.value < 10000) {
                companyNumber.style.borderColor = "";
            } else {
                companyNumber.style.borderColor = "red";
            }
        } else {
            companyNumber.style.borderColor = "";
        }

        if (username.style.borderColor == "red" || password.style.borderColor == "red" || confirmPassword.style.borderColor == "red"
            || email.style.borderColor == "red" || companyNumber.style.borderColor == "red") {
            validDivEl.style.display = "none";
        } else {
            validDivEl.style.display = "block";
        }
    }
}