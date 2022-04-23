const { expect } = require("chai");
const { List } = require("mocha/lib/reporters");
const {Builder, By, Key, ulit, WebDriver, Webelement, WebElement} = require ("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const should = require("chai").should();

let address = "http://localhost:8012" //to be changed

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

let task = {
    name:makeid(10),
    date:"01/01/2023",
    time:"09:15AM"
}

let task2 = {
    name:makeid(10),
    date:"01/01/2023",
    time:"09:30AM"
}

let intTask = {
    name:makeid(10),
    date:"02/02/2024",
    time:"11:30AM"
}

let intTask2 = {
    name:makeid(10),
    date:"02/02/2024",
    time:"11:45AM"
}

let connected = true;

describe("Testing Connection", async function(){
    it("Application should be running", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        console.log("Address: "+address);
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

/*Write the unit tests to complete the testing suite

-Features that need testing:
    -Adding a task
    -Changing a task's status
    -Deleting a task
*/