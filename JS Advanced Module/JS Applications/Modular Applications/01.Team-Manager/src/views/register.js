import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import { renderView } from "../render.js";

const registerTemplate = (onSubmit, error) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
            ${error ? html`<div class="error">${error}</div>` : ""}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;

export async function registerPage(ctx) {
    const registerPage = registerTemplate(onSubmit);

    renderView(registerPage, ctx);
    document.getElementById("registerLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        const rePass = formData.get("repass");

        if (!email || !username || !password || !rePass) {
            renderView(registerTemplate(onSubmit, "All fields must be filled"), ctx);
            return;
        } else if (password != rePass) {
            renderView(registerTemplate(onSubmit, "Passwords don't match"), ctx);
            return;
        }

        await register({ email, username, password });
        ctx.page.redirect("/");
    }
}