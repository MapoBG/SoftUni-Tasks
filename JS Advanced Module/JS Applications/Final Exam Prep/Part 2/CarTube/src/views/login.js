import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";
import { renderView } from "../render.js";


const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;

export async function loginPage(ctx) {
    const loginPage = loginTemplate(onSubmit);

    renderView(loginPage);
    // document.getElementById("loginLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userData = {
            username: formData.get("username"),
            password: formData.get("password"),
        }

        if (!userData.username || !userData.password) {
            return alert("All fields must be filled");
        }

        await login(userData);
        ctx.page.redirect("/catalog");
    }
}