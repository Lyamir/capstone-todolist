const { List } = require("mocha/lib/reporters");
const {Builder, By, Key, ulit, WebDriver, Webelement, WebElement} = require ("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const should = require("chai").should();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i=0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
    }
    return result;
}

let item = {
    name:makeid(10),
    date:"01012023",
    time:"1200AM"
}

let address = "http://localhost:3000" //to be changed

let connected = true;

describe("Testing Connection", async function(){
    it("Application should be running", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        try{
            await driver.get(address);

            await driver.quit();
        }
        catch{
            connected = false;
            throw new Error("Cannot establish connection to application");
        }
    });
});

describe.only("Unit Tests", async function(){
    before(function(){
        connected.should.be.true;
    });
    it("It should add an item", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        await driver.get(address);

        console.log("name "+item.name);
        console.log("date "+item.date);

        await driver.findElement(By.id("title")).sendKeys(item.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(item.date, Key.TAB, item.time);

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();

        await driver.get(address);

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+item.name+"\")]"));

        testName.should.not.be.empty;

        await driver.quit();
    });
});
describe("Integration Tests", async function(){
    before(function(){
        connected.should.be.true;
    });
    it("second test", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        await driver.get(address);

        await driver.quit();
    });
});