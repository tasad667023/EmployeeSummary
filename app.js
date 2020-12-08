const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var arrEmployee = [];

function employeeData() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What is your role?',
        choices: ["Engineer", "Manager", "Intern"]
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is your Id?',
      },
      {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
      },
    ])
    .then((data) => {
      if (data.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'What is your github account?',
              name: 'github',
            },
          ])
          .then((response) => {
            let info = new Engineer(data.name, data.id, data.email, response.github);
            console.log(info);
            arrEmployee.push(info);
            addAnotherUser();
          })
      }
      if (data.role === "Intern") {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'What school did you go to?',
              name: 'school',
            },
          ])
          .then((response) => {
            let internInfo = new Intern(data.name, data.id, data.email, response.school);
            console.log(internInfo);
            arrEmployee.push(internInfo);
            addAnotherUser();
          })
      }
      if (data.role === "Manager") {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'What is your office number?',
              name: 'office',
            },
          ])
          .then((response) => {
            let managerInfo = new Manager(data.name, data.id, data.email, response.office);
            // console.log(managerInfo);
            arrEmployee.push(managerInfo);
            console.log(arrEmployee);
            addAnotherUser();
          })
      }

    })
}

function renderHtml() {
  var test = render(arrEmployee)
  fs.writeFileSync(outputPath, test)
}

function addAnotherUser() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Do you want to add another user?',
        name: 'user',
      }
    ])
    .then((response) => {
      if (response.user === true) {
       employeeData();
      }
      else {
        renderHtml();
      }
    })
}
employeeData();

