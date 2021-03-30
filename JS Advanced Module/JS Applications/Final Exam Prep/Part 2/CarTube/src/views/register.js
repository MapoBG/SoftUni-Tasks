import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import { renderView } from "../render.js";


const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="container">
        <form @submit=${onSubmit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
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
            password: formData.get("password"),
            rePass: formData.get("repeatPass"),
        }

        if (!userData.username || !userData.password || !userData.rePass) {
            return alert("All fields must be filled");
        } else if (userData.password != userData.rePass) {
            return alert("Passwords don't match");
        }

        await register(userData);
        ctx.page.redirect("/catalog");
    }
}