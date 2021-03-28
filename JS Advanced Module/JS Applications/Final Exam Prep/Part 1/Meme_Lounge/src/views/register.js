import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import { renderView } from "../render.js";
import { notificationTemplate } from "./notification.js";

const registerTemplate = (onSubmit, errorMsg) => html`
${errorMsg ? notificationTemplate(errorMsg) : ""}
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export async function registerPage(ctx) {
    const registerPage = registerTemplate(onSubmit);

    renderView(registerPage);
    // document.getElementById("registerLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            rePass: formData.get("repeatPass"),
            gender: formData.get("gender"),
        }

        if (!userData.username || !userData.email || !userData.password || !userData.rePass) {
            renderView(registerTemplate(onSubmit, "All fields must be filled"));
            return;
        } else if (userData.password != userData.rePass) {
            renderView(registerTemplate(onSubmit, userData));
            return alert("Passwords don't match");
        }

        await register(userData);
        ctx.page.redirect("/catalog");
    }
}