const {Builder, By, Key, ulit, WebDriver, Webelement} = require ("selenium-webdriver");
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

describe("Unit Tests", async function(){
    before(function(){
        connected.should.be.true;
    });
    it("first test", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        await driver.get(address);

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