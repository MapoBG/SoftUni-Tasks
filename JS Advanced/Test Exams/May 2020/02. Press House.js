function pressHouse() {
    class Article {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Title: ${this.title}\nContent: ${this.content}`;
        }
    }

    class ShortReports extends Article {
        constructor(title, content, originalResearch) {
            super(title, content);
            this.originalResearch = originalResearch;
            this.comments = [];
        }

        set content(text) {
            if (text.length >= 150) {
                throw new Error("Short reports content should be less then 150 symbols.");
            }
            this.contentSet = text;
        }
        get content() {
            return this.contentSet;
        }

        set originalResearch(obj) {
            if (!obj.hasOwnProperty("title") || !obj.hasOwnProperty("author")) {
                throw new Error("The original research should have author and title.");
            }
            this.originalResearchSet = obj;
        }
        get originalResearch() {
            return this.originalResearchSet;
        }

        addComment(comment) {
            this.comments.push(comment);
            return "The comment is added.";
        }

        toString() {
            let result = super.toString();
            result += `\nOriginal Research: ${this.originalResearch.title} by ${this.originalResearch.author}`;
            if (this.comments.length > 0) {
                result += `\nComments:\n${this.comments.join("\n")}`;
            }
            return result;
        }
    }

    class BookReview extends Article {
        constructor(title, content, book) {
            super(title, content);
            this.book = book;
            this.orders = [];
        }

        addClient(clientName, orderDescription) {
            this.orders.forEach(order => {
                if (order.clientName == clientName && order.orderDescription == orderDescription) {
                    throw new Error("This client has already ordered this review.");
                }
            });
            this.orders.push({ clientName, orderDescription });
            return `${clientName} has ordered a review for ${this.book.name}`;
        }

        toString() {
            let result = super.toString();
            result += `\nBook: ${this.book.name}`;

            if (this.orders.length > 0) {
                result += `\nOrders:`;
                this.orders.forEach(order => result += `\n${order.clientName} - ${order.orderDescription}`);
            }

            return result;
        }
    }

    return {
        Article,
        ShortReports,
        BookReview,
    }
}

// Is a valid constructor
let classes = pressHouse()
let longContent = 'Yes, its damn true.SpaceX in its recent launch Dragon 2 Flight has used a technology based on Chromium and Javascript. What are your views on this ?'

console.log(new classes.ShortReports('SpaceX and Javascript', longContent, { title: 'Dragon 2', author: 'wikipedia.org' }));
// expect(function(){new classes.ShortReports('SpaceX and Javascript', longContent, { title: 'Dragon 2', author: 'wikipedia.org' })})
//         .to.throw(Error, 'Short reports content should be less then 150 symbols.')