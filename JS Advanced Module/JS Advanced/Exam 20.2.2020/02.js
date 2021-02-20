class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes() {
        if (this._likes.length == 0) {
            return `${this.title} has 0 likes`;
        }

        if (this._likes.length == 1) {
            return `${this._likes[0].name} likes this story!`;
        } else {
            return `${this._likes[0].name} and ${this._likes.length - 1} others like this story!`;
        }
    }

    like(username) {
        if (username == this.creator) {
            throw new Error("You can't like your own story!");
        }

        this._likes.forEach(e => {
            if (e.name == username) {
                throw new Error("You can't like the same story twice!");
            }
        });

        this._likes.push({ name: username, liked: true });

        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        const user = this._likes.find(u => u.name == username);

        if (!user) {
            throw new Error("You can't dislike this story!");
        } else {
            const index = this._likes.indexOf(user);
            this._likes.splice(index, 1);

            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        const comment = this._comments.find(c => c.Id == id);

        if (id == undefined || comment == undefined) {
            this._comments.push({
                Id: this._comments.length + 1,
                Username: username,
                Content: content,
                Replies: [],
            });

            return `${username} commented on ${this.title}`;
        }

        if (comment) {
            const commentId = `${comment.Id}.${comment.Replies.length + 1}`;

            comment.Replies.push({ Id: commentId, Username: username, Content: content });

            return "You replied successfully";
        }
    }

    toString(sortingType) {

        let result = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`;

        const sortFuncs = {
            asc() {
                this._comments
                    .sort((c1, c2) => c1.Id - c2.Id)
                    .forEach(c => {
                        result += `-- ${c.Id}. ${c.Username}: ${c.Content}\n`;

                        c.Replies
                            .sort((r1, r2) => r1.Id - r2.Id)
                            .forEach(r => {
                                result += `--- ${r.Id}. ${r.Username}: ${r.Content}\n`;
                            });
                    });

                return result.trim();
            },
            desc() {
                this._comments
                    .sort((c1, c2) => c2.Id - c1.Id)
                    .forEach(c => {
                        result += `-- ${c.Id}. ${c.Username}: ${c.Content}\n`;

                        c.Replies
                            .sort((r1, r2) => r2.Id - r1.Id)
                            .forEach(r => {
                                result += `--- ${r.Id}. ${r.Username}: ${r.Content}\n`;
                            });
                    });

                return result.trim();
            },
            username() {
                this._comments
                    .sort((c1, c2) => c1.Username.localeCompare(c2.Username))
                    .forEach(c => {
                        result += `-- ${c.Id}. ${c.Username}: ${c.Content}\n`;

                        c.Replies
                            .sort((r1, r2) => r1.Username.localeCompare(r2.Username))
                            .forEach(r => {
                                result += `--- ${r.Id}. ${r.Username}: ${r.Content}\n`;
                            });
                    });

                return result.trim();
            }
        }

        return sortFuncs[sortingType].call(this);
    }
}

// let art = new Story("My Story", "Anny");
// art.like("John");
// console.log(art.likes);
// art.dislike("John");
// console.log(art.likes);
// art.comment("Sammy", "Some Content");
// console.log(art.comment("Ammy", "New Content"));
// art.comment("Zane", "Reply", 1);
// art.comment("Jessy", "Nice :)");
// console.log(art.comment("SAmmy", "Reply@", 1));
// console.log()
// // console.log(art.toString('asc'));
// // console.log()
// console.log(art.toString('username'));
// console.log()
// art.like("Zane");
// console.log(art.toString('desc'));

let art = new Story("My Story", "Anny");
console.log(art.like("John"), "John liked My Story!");
console.log(art.likes, "John likes this story!");
art.dislike("Sally");
assert.throw(() => art.dislike("Sally"), "You can't dislike this story!");
assert.equal(art.like("Ivan"), "Ivan liked My Story!");
assert.equal(art.like("Steven"), "Steven liked My Story!");
assert.equal(art.likes, "John and 2 others like this story!");
assert.equal(art.comment("Anny", "Some Content"), "Anny commented on My Story");
assert.equal(art.comment("Ammy", "New Content", 1), "You replied successfully");
assert.equal(art.comment("Zane", "Reply", 2), "Zane commented on My Story");
assert.equal(art.comment("Jessy", "Nice :)"), "Jessy commented on My Story");
console.log(art.comment("SAmmy", "Reply@", 2), "You replied successfully");

assert.equal(art.toString('asc'), `Title: My Story
Creator: Anny
Likes: 3
Comments:
-- 1. Anny: Some Content
--- 1.1. Ammy: New Content
-- 2. Zane: Reply
--- 2.1. SAmmy: Reply@
-- 3. Jessy: Nice :)`);