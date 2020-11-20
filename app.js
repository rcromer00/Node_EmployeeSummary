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


 var questions = inquirer.prompt([
    {
       type: 'input',
       message: 'What is your name?',
       name: 'name', 
    },
    {
        type: 'input',
        message: 'What is your email ',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your id ',
        name: 'id',
    },
    {
        type: 'list',
        message: 'What is your role?',
        name: 'role',
        choices: [
            'Engineer',
            'Manager',
            'Intern'
        ]
    }, {
            type: 'input',
            message: 'Please enter your GitHub username.',
            name: 'username',
            when: (answers) => answers.role === 'Engineer'
        },
        {
            type: 'input',
            message: 'Please enter your Office Number.',
            name: 'officeNumber',
            when: (answers) => answers.role === 'Manager'
        },
        { 
            type: 'input',
            message: 'Please enter the name of your School.',
            name: 'school',
            when: (answers) => answers.role === 'Intern'
        }
 ]).then(function(data){
     console.log(data);
         const engineer = new Engineer(data.name,data.id, data.email, data.username);
         emp.push(engineer);
         const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
         emp.push(manager);
         const intern = new Intern(data.name, data.id, data.email, data.school);
         emp.push(intern);

         fs.writeFileSync(outputPath, render(emp),"utf-8");    
