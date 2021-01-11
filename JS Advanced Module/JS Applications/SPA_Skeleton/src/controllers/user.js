import { login, register } from "../data.js";
import { addPartials, checkRegisterData } from "../services.js";

export async function registerPage() {
    await addPartials(this);

    this.partial("./templates/registerForm.hbs");
}

export async function loginPage() {
    await addPartials(this);

    this.partial("./templates/loginForm.hbs");
}

export async function postRegister(context) {
    const { email, password, rePass } = context.params;
    if (!checkRegisterData(email, password, rePass)) {
        return;
    }

    const result = await register(email, password, rePass);

    context.app.userData = result;
    context.redirect("/");
}

export async function postLogin(context) {
    const { email, password } = context.params;
    const rePass = password;
    if (!checkRegisterData(email, password, rePass)) {
        return;
    }

    const result = await login(email, password);

    context.app.userData = result;
    context.redirect("/");
}

export function logout() {
    localStorage.clear("user");
    this.redirect("/login");
}