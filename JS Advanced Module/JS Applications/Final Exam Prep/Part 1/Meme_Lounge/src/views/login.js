import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";
import { renderView } from "../render.js";
import { notificationTemplate } from "./notification.js";

const loginTemplate = (onSubmit, errorMsg) => html`
${errorMsg ? notificationTemplate(errorMsg) : ""}
<section id="login">
    <form @submit=${onSubmit} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export async function loginPage(ctx) {
    const loginPage = loginTemplate(onSubmit);

    renderView(loginPage);
    // document.getElementById("loginLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userData = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        if (!userData.email || !userData.password) {
            renderView(loginTemplate(onSubmit, "All fields must be filled"));
            return;
        }

        await login(userData);
        ctx.page.redirect("/catalog");
    }
}