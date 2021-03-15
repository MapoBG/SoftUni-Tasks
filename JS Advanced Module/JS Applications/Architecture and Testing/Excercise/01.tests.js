const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

let browser, page, context;

describe("E2E tests", function () {
    this.timeout(6000);

    before(async () => { browser = await chromium.launch(); });

    after(async () => { await browser.close(); });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("http://localhost:5500/01.Messenger");
    });

    afterEach(async () => { await page.close(); });

    it("renders all messages", async () => {
        await page.click("#refresh");

        const content = await page.$eval("#messages", el => el.value);

        expect(content).contains("Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))");
    });

    it("create new message", async () => {
        const endpoint = "http://localhost:3030/jsonstore/messenger";
        const name = "john";
        const message = "john@abv.bg";

        await page.fill("#author", name);
        await page.fill("#content", message);

        const [response] = await Promise.all([
            page.waitForResponse(endpoint),
            page.click("#submit")
        ]);

        const postData = JSON.parse(response.request().postData());
        expect(postData.author).to.equal(name);
        expect(postData.content).to.equal(message);
    });
});