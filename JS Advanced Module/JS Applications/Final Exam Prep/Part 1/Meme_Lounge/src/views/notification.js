import { html } from "../../node_modules/lit-html/lit-html.js";

export const notificationTemplate = (errorMsg) => html`
<!-- Notifications -->
<section id="notifications">
    <div id="errorBox" class="notification" style = "display:block">
        <span>${errorMsg}</span>
    </div>
</section>`;