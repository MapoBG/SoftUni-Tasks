import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";
import { renderView } from "../render.js";

const loginTemplate = (onSubmit, validEmail, validPass) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (validEmail ? " is-valid" : " is-invalid")} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (validPass ? " is-valid" : " is-invalid")} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export async function loginPage(ctx) {
    const loginPage = loginTemplate(onSubmit);

    renderView(loginPage);
    document.getElementById("loginLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();
    
        const [emailEl, passwordEl] = e.target.elements;
        const email = emailEl.value;
        const password = passwordEl.value;
    
        if (!email || !password) {
            renderView(loginTemplate(onSubmit, email, password));
            return alert("All fields must be filled");
        }
    
        await login({ email, password });
        ctx.page.redirect("/");
    }
}