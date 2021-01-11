import { addPartials } from "../services.js";
import { login, register } from "../data.js";

export async function registerPage() {
    await addPartials(this);

    this.partial("./templates/user/registerForm.hbs");
}

export async function loginPage() {
    await addPartials(this);

    this.partial("./templates/user/loginForm.hbs");
}

export async function postRegister(context) {
    const { email, password, rePass } = context.params;

    try {
        if (!email || !password) {
            throw new Error("All fileds must be filled!");
        } else if (password !== rePass) {
            throw new Error("Passwords don't match!");
        }

        const result = await register(email, password, rePass);
        context.app.userData = result;
        context.redirect("/home");
    } catch (error) {
        alert(error.message);
    }
}

export async function postLogin(context) {
    const { email, password } = context.params;

    try {
        if (!email || !password) {
            throw new Error("All fileds must be filled!");
        }

        const result = await login(email, password);
        context.app.userData = result;
        context.redirect("/home");
    } catch (error) {
        alert(error.message);
    }
}