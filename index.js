const inquirer = require('inquirer');
const viewAllDepartments = require('./config/viewDepartments');
const viewAllRoles = require('./config/viewRoles');
const viewAllEmployees = require('./config/viewEmployees');
const addDepartment = require('');
const addRole = require('');
const addEmployee = require(''); 
const updateRole = require('');

inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "options",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", 
                "Add a Role", "Add an Employee", "Update an Employee Role",]
        }
    ])
    .then((data) => {
        switch (data.options) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees;
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateRole();
                break;
        }
    })
    .catch((error) => {
        console.error("Prompt Error", error);
    });