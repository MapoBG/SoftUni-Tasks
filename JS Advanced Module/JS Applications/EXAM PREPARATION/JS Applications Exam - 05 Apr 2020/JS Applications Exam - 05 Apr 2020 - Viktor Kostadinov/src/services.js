export function setUserData(data) {
    sessionStorage.setItem('auth', JSON.stringify(data));
}

export function getUserData() {
    const auth = sessionStorage.getItem("auth");

    if (auth !== null) {
        return JSON.parse(auth);
    } else {
        return null;
    }
}

export function getUserId() {
    const auth = sessionStorage.getItem("auth");

    if (auth !== null) {
        return JSON.parse(auth).localId;
    } else {
        return null;
    }
}

export function objectToArray(obj) {
    if (!obj) {
        return [];
    }

    return Object.entries(obj).map(([key, value]) => Object.assign({ _id: key }, value));
}

export async function addPartials(ctx) {
    const partials = await Promise.all([                //use Promise.all for 2+ partials - for 1 it could be: header = await ctx.load("/templates/partials/header.hbs")
        ctx.load("/templates/partials/header.hbs"),
        ctx.load("/templates/partials/footer.hbs")
    ]);
    ctx.partials = { header: partials[0], footer: partials[1] };
}

export const categoryMap = {
    "JavaScript": "js",
    "C#": "cSharp",
    "Java": "java",
    "Python": "python",
}

export function mapCategories(data) {
    const result = {
        js: [],
        cSharp: [],
        java: [],
        python: []
    }

    for (let article of data) {
        result[categoryMap[article.category]].push(article);
    }

    return result;
}