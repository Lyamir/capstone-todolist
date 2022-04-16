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

let task = {
    name:makeid(10),
    date:"01/01/2023",
    time:"09:15AM"
}

let intTask = {
    name:makeid(10),
    date:"02/02/2024",
    time:"11:30AM"
}

let address = "http://localhost:3000" //to be changed

let connected = true;
let passed = true;

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
    it("It should add a task", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
         
        await driver.get(address);

        console.log("Task ID: "+task.name);

        await driver.findElement(By.id("title")).sendKeys(task.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(task.date.replace('/', ''), Key.TAB, task.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();

        await driver.get(address);

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+task.name+"\")]"));
        let testDate = await driver.findElements(By.id(task.name+"/"+task.date+" "+task.time));
        
        try{
            testName.should.not.be.empty;
            testDate.should.not.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });

    it("It should change task status", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
         
        await driver.get(address);

        await driver.findElement(By.id("submitbtn/"+task.name)).click();
        let status = await driver.findElement(By.id("status/"+task.name)).getText();

        try{
            status.should.be.equal.toString("complete");
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
    it("It should delete the created task", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
         
        await driver.get(address);

        await driver.findElement(By.id("deletebtn/"+task.name)).click();

        let deletedtask = await driver.findElements(By.xpath("//*[contains(text(), \""+task.name+"\")]"));

        try{
            deletedtask.should.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
    it("It should mark all tasks as complete", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
         
        await driver.get(address);

        await driver.findElement(By.id("completeAll")).click();

        let incompleteTasks = await driver.findElements(By.xpath("//*[contains(text(), \"incomplete\")]"));

        try{
            incompleteTasks.should.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
});
describe("Integration Tests", async function(){
    before(function(){
        connected.should.be.true;
        passed.should.be.true;
    });
    it("Integration Testing", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
         
        await driver.get(address);

        console.log("Task ID: "+intTask.name);

        await driver.findElement(By.id("title")).sendKeys(intTask.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(intTask.date.replace('/', ''), Key.TAB, intTask.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();

        await driver.get(address);

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask.name+"\")]"));
        let testDate = await driver.findElements(By.id(intTask.name+"/"+intTask.date+" "+intTask.time));
        
        testName.should.not.be.empty;
        testDate.should.not.be.empty;

        await driver.findElement(By.id("submitbtn/"+intTask.name)).click();
        let status = await driver.findElement(By.id("status/"+intTask.name)).getText();

        status.should.be.equal.toString("complete");

        await driver.findElement(By.id("deletebtn/"+intTask.name)).click();

        let deletedtask = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask.name+"\")]"));

        deletedtask.should.be.empty;

        await driver.quit();
    });
});