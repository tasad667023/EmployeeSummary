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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


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
            console.log(managerInfo);
            arrEmployee.push(managerInfo);
          })
      }
  })









    // const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

    // fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
    //   err ? console.log(err) : console.log('Success!')
