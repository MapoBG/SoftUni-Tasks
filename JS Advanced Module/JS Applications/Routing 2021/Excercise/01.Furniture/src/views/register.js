import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";
import { renderView } from "../render.js";

const registerTemplate = (onSubmit, validEmail, validPass, validRePass) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${"form-control" + (validRePass ? " is-valid" : " is-invalid")} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export async function registerPage(ctx) {
    const registerPage = registerTemplate(onSubmit);

    renderView(registerPage);
    document.getElementById("registerLink").classList.add("active");

    async function onSubmit(e) {
        e.preventDefault();
        const [emailEl, passwordEl, rePassEl] = e.target.elements;
        const email = emailEl.value;
        const password = passwordEl.value;
        const rePass = rePassEl.value;

        if (!email || !password || !rePass) {
            renderView(registerTemplate(onSubmit, email, password, rePass));
            return alert("All fields must be filled");
        } else if (password != rePass) {
            renderView(registerTemplate(onSubmit, email, false, false));
            return alert("Passwords don't match");
        }

        await register({ email, password });
        ctx.page.redirect("/");
    }
}