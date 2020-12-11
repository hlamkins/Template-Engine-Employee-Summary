const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function newEmployee() {
     inquirer
     .prompt([
        {
            type: "input",
            name: "name",
            message: "Employee Name:"
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Employee e-mail:"
        },
        {
            type: "rawlist",
            name: "role",
            message: "Role:",
            choices: [
                'Manager',
                'Engineer',
                'Intern'
            ]
        },
        {
            type: "input",
            name: "school",
            message: "School:",
            when: (answers) => answers.role === "Intern"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Office Number:",
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "GitHub User:",
            when: (answers) => answers.role === "Engineer"
        },


    ]).then((answers) => {
        if (answers.role === "Manager") {
            const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber)
            employees.push(manager);
        }
        else if (answers.role === "Intern") {
            const intern = new Intern (answers.name, answers.id, answers.email, answers.school)
            employees.push(intern);
        }
        else if (answers.role === "Engineer") {
            const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
            employees.push(engineer);
        }

        console.log(answers);
        anotherEmployee();

    })
 
}

function fileCheck() {
    if (!fs.existsSync(OUTPUT_DIR)) {fs.mkdirSync(OUTPUT_DIR)}
        fs.writeFileSync(outputPath, render(employees), "utf-8");
}

function anotherEmployee() {
    inquirer
    .prompt ({
        type: "confirm",
        name: "continue",
        message: "Do you have more people to enter?"
    }).then((data) => {data.continue ? newEmployee() : fileCheck()})
}    




newEmployee();



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

// HINT: make sure to build out your classes first! Remember that your Managec