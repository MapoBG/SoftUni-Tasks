import { deleteItem } from "./api/data.js";

export async function deleteUserItem(ctx) {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
        await deleteItem(ctx.params.id);
        ctx.page.redirect("/");
    }
}