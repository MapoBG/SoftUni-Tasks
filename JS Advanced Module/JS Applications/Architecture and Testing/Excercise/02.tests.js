const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

let browser, page, context;

describe("E2E tests", function () {
    this.timeout(16000);

    before(async () => { browser = await chromium.launch(); });

    after(async () => { await browser.close(); });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("http://localhost:5500/02.Book-Library");
    });

    afterEach(async () => { await page.close(); });

    it("render all books", async () => {
        await page.click("#loadBooks");

        await page.waitForSelector("td");

        const content = await page.$$eval("td", t => t.map(s => s.textContent));

        // expect(content.length).to.equal(6);
        expect(content[0]).to.contains("Harry Potter and the Philosopher's Stone");
        expect(content[1]).to.contains("J.K.Rowling");
        expect(content[3]).to.contains("C# Fundamentals");
        expect(content[4]).to.contains("Svetlin Nakov");
    });

    it("create new book", async () => {
        const endpoint = "http://localhost:3030/jsonstore/collections/books";
        const title = "Lord of the rings";
        const author = "J.R.R.Tolkien";

        await page.fill('input[name="title"]', title);
        await page.fill('input[name="author"]', author);

        const [response] = await Promise.all([
            page.waitForResponse(endpoint),
            page.click("#createForm button")
        ]);

        const postData = JSON.parse(response.request().postData());
        expect(postData.author).to.equal(author);
        expect(postData.title).to.equal(title);
    });

    it("edit book", async () => {
        await page.click("#loadBooks");

        await page.waitForSelector("tbody >> tr:nth-child(3)");

        await page.click("tbody tr:nth-child(3) >> .editBtn");

        const id = await page.getAttribute("tbody tr:nth-child(3)", "data-id");

        const authorVal = await page.$$eval('#editForm input[name="author"]', e => e.map(e => e.value));
        const titleVal = await page.$$eval('#editForm input[name="title"]', e => e.map(e => e.value));

        expect(authorVal[0]).to.contains("J.R.R.Tolkien");
        expect(titleVal[0]).to.contains("Lord of the rings");

        const test = "test";

        await page.fill('#editForm input[name="title"]', test);

        const [response] = await Promise.all([
            page.waitForResponse('http://localhost:3030/jsonstore/collections/books/' + id),
            page.click('text="Save"')
        ]);

        const postData = JSON.parse(response.request().postData());
        expect(postData.title).to.equal("test");
        expect(postData.author).to.equal(authorVal[0]);
    });

    it("delete book", async () => {
        await page.click("#loadBooks");

        await page.waitForSelector("tbody >> tr:nth-child(3)");

        const id = await page.getAttribute("tbody tr:nth-child(3)", "data-id");

        page.on('dialog', dialog => dialog.accept());

        const [request] = await Promise.all([
            page.waitForRequest("http://localhost:3030/jsonstore/collections/books/" + id),
            await page.click("tbody tr:nth-child(3) >> .deleteBtn")
        ]);

        expect(request.method()).to.equal('DELETE');
    });
});