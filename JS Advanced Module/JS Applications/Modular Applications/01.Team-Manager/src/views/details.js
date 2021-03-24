import { html } from "../../node_modules/lit-html/lit-html.js";
import { renderView } from "../render.js";
import { acceptApplication, applyForTeam, deleteApplication, getItem, getMemberships } from "../api/data.js";
import { getMemberInfo } from "../util.js";

const detailsTemplate = (itemData, userStat, memberships, ctx) => html`
<section id="team-home"  @click=${(e) => chooseAction(e.target, ctx)}>
    <article class="layout">
        <img src=${itemData.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${itemData.name}</h2>
            <p>${itemData.description}</p>
            <span class="details">${itemData.members} ${itemData.members == 1 ? "Member" : "Members"}</span>
            ${userStat.userId ? mainButtonsTemplate(itemData, userStat) : ""}
        </div>
        ${teamTemplate(memberships, userStat)}
        ${userStat.isCreator ? requestsTemplate(memberships) : ""}
    </article>
</section>`;

const mainButtonsTemplate = (itemData, userStat) => html`
<div>
    ${userStat.isCreator ? html`<a href="/edit/${itemData._id}" class="action">Edit team</a>` : ""}
    ${userStat.hasApplied || userStat.isCreator || userStat.isMember ? "" :  html`<a href="javascript:void(0)" class="action" id="join">Join team</a>`}
    ${userStat.isCreator ? "" 
        : userStat.isMember ? html`<a href="javascript:void(0)" class="action invert" id="leave">Leave team</a>` 
        : userStat.hasApplied ? html`Membership pending. <a href="javascript:void(0)" id="cancel">Cancel request</a>`
        : ""}
</div>`;

const teamTemplate = (memberships, userStat) => html`
<div class="pad-large"}>
    <h3>Members</h3>
        <ul class="tm-members">
            ${memberships
                .filter(m => m.status == "member")
                .map(m => html`<li>${m.user.username}${userStat.isCreator && m.user._id != userStat.userId
                    ? html`<a href="javascript:void(0)" class="tm-control action" id="remove" data-id=${m.user._id}>Remove from team</a>`
                    : ""}</li>`
                )}
        </ul>
</div>`;

const requestsTemplate = (memberships) => html`
<div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">
        ${memberships.filter(m => m.status == "pending").map(m => html`
        <li>${m.user.username}<a data-id=${m.user._id} href="javascript:void(0)" class="tm-control action" id="approve">Approve</a>
        <a data-id=${m.user._id} href="javascript:void(0)" class="tm-control action" id="decline">Decline</a></li>`)}
    </ul>
</div>`;

export async function detailsPage(ctx) {
    const teamId = ctx.params.id;
    
    const [itemData, memberships] = await Promise.all([getItem(teamId), getMemberships(teamId)]);

    itemData.members = memberships.filter(m => m.status == "member").length;
    
    const userStat = userStatus(memberships, ctx.user);
    userStat.isCreator = itemData._ownerId == userStat.userId;

    const detailsPageResult = detailsTemplate(itemData, userStat, memberships, ctx);

    renderView(detailsPageResult, ctx);
}

function userStatus(memberships, userId) {
    const [isMember] = memberships.filter(member => member.user._id == userId && member.status == "member");
    const [hasApplied] = memberships.filter(member => member.user._id == userId && member.status == "pending");

    return {isMember, hasApplied, userId};
}

async function chooseAction(target, ctx) {
    if(target.tagName != "A"){
        return;
    }

    let memberInfo;

    if (target.id == "approve"){
        memberInfo = await getMemberInfo(ctx, target);
        delete memberInfo.user;
        await acceptApplication(memberInfo);
    } else if (target.id == "join"){
        await applyForTeam({teamId: ctx.params.id});
    } else if (target.id == "leave" || target.id == "cancel") {
        memberInfo = await getMemberInfo(ctx);
        await deleteApplication(memberInfo._id);
    } else if (target.id == "remove" || target.id == "decline"){
        memberInfo = await getMemberInfo(ctx, target);
        await deleteApplication(memberInfo._id);
    }

    await detailsPage(ctx);
}