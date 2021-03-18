import { logout } from "./api/data.js";

export async function logoutUser(ctx) {
    await logout();
    ctx.page.redirect("/");
}