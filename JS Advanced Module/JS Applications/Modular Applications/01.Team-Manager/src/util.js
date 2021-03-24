import { getMembers, getMemberships } from "./api/data.js";
import { renderView } from "./render.js";

export function checkFormData(form, template, onSubmit, ctx) {

    const data = getFormData(form);

    if (!data.name || !data.logoUrl || !data.description) {
        renderView(template(data, onSubmit, "All fields are mandatory"), ctx);
        throw Error;
    } else if (data.name.length < 4) {
        renderView(template(data, onSubmit, "Name must be at least 4 characters long"), ctx);
        throw Error;
    } else if (data.description.length < 10) {
        renderView(template(data, onSubmit, "Description must be at least 10 characters long"), ctx);
        throw Error;
    }

    return data;
}

function getFormData(form) {
    const formData = new FormData(form);

    const name = formData.get("name");
    const logoUrl = formData.get("logoUrl");
    const description = formData.get("description");

    const data = {
        name,
        logoUrl,
        description,
    };

    return data;
}

export async function getMemberInfo(ctx, target) {
    const memberships = await getMemberships(ctx.params.id);
    let memberInfo;

     if(!target){
        memberInfo = memberships.filter(m => m._ownerId == ctx.user && ctx.params.id == m.teamId)[0];
     } else {
        memberInfo = memberships.filter(m => m._ownerId == target.dataset.id && ctx.params.id == m.teamId)[0];
     }
     
     memberInfo.status = "member";
     return memberInfo;
 }

 export async function setMembersCount(data) {
    const members = await getMembers();

    data.forEach(team => {
        team.members = 0;
        members.forEach(m => {
            if (team._id == m.teamId) {
                team.members++;
            }
        });
    });

    return data;
}