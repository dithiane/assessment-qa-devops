const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.get("http://localhost:4000");
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("Check if clicking the Draw button displays the div with id = “choices”", async () => {
    await driver.findElement(By.xpath('//button[text()="Draw"]')).click()
    await driver.sleep(2000)
    const choices = await driver.findElement(By.id('choices'))
    await driver.wait(until.elementIsVisible(choices))
  });

  test("Check if clicking an “Add to Duo” button displays the div with id = “player-duo", async () => {
    await driver.findElement(By.xpath('//button[text()="Draw"]')).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath('//button[text()="Add to Duo"]')).click()
    await driver.sleep(2000)
    const player_duo = await driver.findElement(By.id('player-duo')).isDisplayed()
    expect(player_duo).toEqual(true)
  });
});