import { extendContext, checkInput, saveUserData } from "../util.js";
import "../dbInit.js";

const userModel = firebase.auth();

export async function registerPage(context) {
    await extendContext(context);
    this.partial("./templates/registerForm.hbs");
}

export async function loginPage(context) {
    await extendContext(context);
    this.partial("./templates/loginForm.hbs");
}

export function logout() {
    userModel.signOut()
        .then(() => {
            localStorage.removeItem("user");
            this.redirect("/login");
        });
}

export function registerPost(context) {
    const { email, password, rePassword } = context.params;

    if (!checkInput(email, password, rePassword)) {
        return;
    }

    userModel.createUserWithEmailAndPassword(email, password)
        .then(userData => {
            saveUserData(userData, this);
        })
        .catch(error => console.error(error));
}

export function loginPost(context) {
    const { email, password } = context.params;

    userModel.signInWithEmailAndPassword(email, password)
        .then(userData => {
            const { user } = userData;
            localStorage.setItem("user", JSON.stringify(user));
            context.redirect("/home");
        })
        .catch(error => console.error(error));
}