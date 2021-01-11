
export async function addPartials(context) {
    const partials = await Promise.all([
        context.load("/templates/partials/header.hbs"),
        context.load("/templates/partials/footer.hbs"),
    ]);
    const [header, footer] = partials;
    context.partials = { header, footer };
}

export function checkRegisterData(email, password, rePassword) {
    try {
        if (!email || !password || !rePassword) {
            throw new Error("All fields must be filled!");
        } else if (password !== rePassword) {
            throw new Error("Passwords don't match!");
        }
        return true;
    } catch (error) {
        alert(error.message);
    }
}

export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
    const user = localStorage.getItem("user");

    if (user) {
        return JSON.parse(user);
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

export function mapCategories(data) {
    const result = {
        "JavaScript": [],
        "C#": [],
        "Java": [],
        "Python": []
    }

    for (const article of data) {
        result[article.category].push(article);
    }

    result["CSharp"] = result["C#"];
    delete result["C#"];

    Object
        .values(result)
        .forEach(x => x.sort((a, b) => b.title.localeCompare(a.title)));

    return result;
}