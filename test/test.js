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
let passed = true;

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
before(function(){
    connected.should.be.true;
});
describe("Unit Tests", async function(){
    it("It should add a task", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);

        console.log("Task1 ID: "+task.name);

        await driver.findElement(By.id("title")).sendKeys(task.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(task.date.replace('/', ''), Key.TAB, task.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();

        await driver.get(address);
        
        console.log("Task2 ID: "+task2.name);

        await driver.findElement(By.id("title")).sendKeys(task2.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(task2.date.replace('/', ''), Key.TAB, task2.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();
        
        await driver.get(address);

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+task.name+"\")]"));
        let testDate = await driver.findElements(By.id(task.name+"/"+task.date+" "+task.time));
        
        try{
            testName.should.not.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }
        
        try{
            testDate.should.not.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
    
     it("It should add a second task", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);

	    console.log("Task2 ID: "+task2.name);

        await driver.findElement(By.id("title")).sendKeys(task2.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(task2.date.replace('/', ''), Key.TAB, task2.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();
        
        await driver.get(address);

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+task2.name+"\")]"));
        let testDate = await driver.findElements(By.id(task2.name+"/"+task2.date+" "+task2.time));
        
        try{
            testName.should.not.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }
        
        try{
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
            expect(status).to.equal("completed");
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
        let taskStatus = await driver.findElement(By.id("status/"+task2.name)).getText();
        
        try{
            incompleteTasks.should.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        try{
            expect(taskStatus).to.equal("completed");
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
    it("It should delete the created tasks", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);

        await driver.findElement(By.id("deletebtn/"+task.name)).click();
        await driver.findElement(By.id("deletebtn/"+task2.name)).click();

        let deletedtask = await driver.findElements(By.xpath("//*[contains(text(), \""+task.name+"\")]"));
        let deletedtask2 = await driver.findElements(By.xpath("//*[contains(text(), \""+task2.name+"\")]"));

        try{
            deletedtask.should.be.empty;
            deletedtask2.should.be.empty;
        }
        catch(e){
            passed = false;
            throw new Error(e);
        }

        await driver.quit();
    });
});
before(function(){
    connected.should.be.true;
    passed.should.be.true;
});
describe("Integration Testing", async function(){
    it("Task creation", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);
        //Add a task
        console.log("Task ID: "+intTask.name);

        await driver.findElement(By.id("title")).sendKeys(intTask.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(intTask.date.replace('/', ''), Key.TAB, intTask.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();

        //Change task status
        await driver.get(address);

        await driver.findElement(By.id("submitbtn/"+intTask.name)).click();
        let status = await driver.findElement(By.id("status/"+intTask.name)).getText();

        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask.name+"\")]"));
        let testDate = await driver.findElements(By.id(intTask.name+"/"+intTask.date+" "+intTask.time));

        try{
            testName.should.not.be.empty;
            testDate.should.not.be.empty;
            
            expect(status).to.equal("completed");
        }
        catch(e){
            throw new Error(e);
        }

        await driver.quit();
    });
    
    it("Creates second task", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);

        console.log("Task2 ID: "+intTask2.name);

        await driver.findElement(By.id("title")).sendKeys(intTask2.name);
        let dateInput = await driver.findElement(By.id("dueDate"))
        await dateInput.click();
        await dateInput.sendKeys(intTask2.date.replace('/', ''), Key.TAB, intTask2.time.replace(':',''));

        await driver.findElement(By.xpath("/html/body/form[1]/button")).click();
        
        let testName = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask2.name+"\")]"));
        let testDate = await driver.findElements(By.id(intTask2.name+"/"+intTask2.date+" "+intTask2.time));

        await driver.get(address);

        try{
            testName.should.not.be.empty;
            testDate.should.not.be.empty;
        }
        catch(e){
            throw new Error(e);
        }

        await driver.quit();
    });
    
    it("Complete all tasks", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);

        await driver.findElement(By.id("completeAll")).click();

        let incompleteTasks = await driver.findElements(By.xpath("//*[contains(text(), \"incomplete\")]"));
        let taskStatus = await driver.findElement(By.id("status/"+intTask2.name)).getText();

        try{
            incompleteTasks.should.be.empty;
            expect(taskStatus).to.equal("completed");
        }
        catch(e){
            throw new Error(e);
        }

        await driver.quit();
    });
    it("Delete created tasks", async function(){
        let options = new firefox.Options();
        options.addArguments("-headless");
        let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
            
        await driver.get(address);
        await driver.findElement(By.id("submitbtn/"+intTask.name)).click();
        let status = await driver.findElement(By.id("status/"+intTask.name)).getText();

        status.should.be.equal.toString("complete");

        await driver.findElement(By.id("deletebtn/"+intTask.name)).click();
        await driver.findElement(By.id("deletebtn/"+intTask2.name)).click();

        let deletedtask = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask.name+"\")]"));
        let deletedtask2 = await driver.findElements(By.xpath("//*[contains(text(), \""+intTask2.name+"\")]"));

        try{
            deletedtask.should.be.empty;
            deletedtask2.should.be.empty;
        }
        catch(e){
            throw new Error(e);
        }

        await driver.quit();
    });
});
