function solve() {

    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }
        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }
        addComment(comment) {
            this.comments.push(comment);
        }
        toString () {
            let result = this.comments.length > 0 ? `\nComments:\n * ${this.comments.join("\n * ")}` : "";
            return super.toString() + `\nRating: ${this.likes - this.dislikes}` + result;
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views){
            super(title, content);
            this.views = views;
        }
        view() {
            this.views++;
            return this;
        }
        toString () {
            return super.toString() + `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

let classes = solve();

let test = new classes.BlogPost("TestTitle", "TestContent", 5);

test.view().view().view();

// expect(test.toString()).to.be.equal(
//             "Post: TestTitle\n" +
//             "Content: TestContent\n" +
//             "Views: 8",
//             "'BlogPost views()' function does not work properly");
