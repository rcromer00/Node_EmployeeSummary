const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var emp = [];

console.log("Welcome to Team Generator!");
 var questions = inquirer.prompt([
     //Engineer Questions
    {
       type: 'input',
       message: 'What is the engineer(s) name?',
       name: 'engineerName', 
    },
    {
        type: 'input',
        message: 'What is the engineer(s) email? ',
        name: 'engineerEmail',
    },
    {
        type: 'input',
        message: 'What is the engineer(s) id?',
        name: 'engineerId',
    }, 
    {
    type: 'input',
    message: 'Please enter the GitHub username of the engineer(s) .',
    name: 'username',
    },
    //Manager Questions
    {
        type: 'input',
        message: 'What is the manager(s) name?',
        name: 'managerName', 
     },
     {
         type: 'input',
         message: 'What is the manager(s) email? ',
         name: 'managerEmail',
     },
     {
         type: 'input',
         message: 'What is the manager(s) id?',
         name: 'managerId',
     }, 
     {
        type: 'input',
        message: 'Please enter the manager(s) Office Number.',
        name: 'officeNumber',
    },
    //Intern Questions
    {
        type: 'input',
        message: 'What is the intern(s) name?',
        name: 'internName', 
     },
     {
         type: 'input',
         message: 'What is the intern(s) email? ',
         name: 'internEmail',
     },
     {
         type: 'input',
         message: 'What is the intern(s) id?',
         name: 'internId',
     }, 
     { 
        type: 'input',
        message: 'Please enter the name of your School.',
        name: 'school',
    }
 ]).then(function(data){
     console.log(data);
         const engineer = new Engineer(data.engineerName,data.engineerId, data.engineerEmail, data.username);
         emp.push(engineer);
         const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber);
         emp.push(manager);
         const intern = new Intern(data.internName, data.internId, data.internEmail, data.school);
         emp.push(intern);

         fs.writeFileSync(outputPath, render(emp),"utf-8");
         console.log("Your file has been successfully written in the Output folder!");
});