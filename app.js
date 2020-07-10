const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

class CLI {
  constructor() {
    this.employees = [];
  }
  run() {
    console.log("Please build your team");
    this.createManager();
  }

  createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
          default: "Engineer",
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case "Engineer":
            return this.createEngineer();
          case "Intern":
            return this.createIntern();
          default:
            console.log("Have a nice day!");
            return this.generateHtml();
            process.exit(0);
        }
      });
  }

  createManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managername",
          message: "What is your manager's name?",
        },
        {
          type: "input",
          name: "managerid",
          message: "What is your manager's id?",
        },
        {
          type: "input",
          name: "manageremail",
          message: "What is your manager's email?",
        },
        {
          type: "input",
          name: "officenumber",
          message: "What is your manager's office number?",
        },
      ])
      .then((answers) => {
        const { managername, managerid, manageremail, officenumber } = answers;
        const manager = new Manager(
          managername,
          managerid,
          manageremail,
          officenumber
        );
        this.employees.push(manager);
        this.createTeam();
      });
  }

  createEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engname",
          message: "What is your engineer's name?",
        },
        {
          type: "input",
          name: "engid",
          message: "What is your engineer's id?",
        },
        {
          type: "input",
          name: "engemail",
          message: "What is your engineer's email?",
        },
        {
          type: "input",
          name: "enggithub",
          message: "What is your engineer's GitHub username?",
        },
      ])
      .then((answers) => {
        const { engname, engid, engemail, enggithub } = answers;
        const engineer = new Engineer(engname, engid, engemail, enggithub);
        this.employees.push(engineer);
        this.createTeam();
      });
  }

  createIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internname",
          message: "What is your intern's name?",
        },
        {
          type: "input",
          name: "internid",
          message: "What is your intern's id?",
        },
        {
          type: "input",
          name: "internemail",
          message: "What is your intern's email?",
        },
        {
          type: "input",
          name: "school",
          message: "Where does your intern go to school??",
        },
      ])
      .then((answers) => {
        const { internname, internid, internemail, school } = answers;
        const intern = new Intern(internname, internid, internemail, school);
        this.employees.push(intern);
        this.createTeam();
      });
  }

  generateHtml() {
    const html = render(this.employees);
    const file = path.join(__dirname, "./output/team.html");
    writeFileAsync(file, html)
      .then(() => {
        console.log(`Created ${file}.`);
        process.exit(0);
      })
      .catch(() => {
        console.log(error);
        console.log("Unable to create team file. Try again.");
      });
  }
}

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
module.exports = CLI;
