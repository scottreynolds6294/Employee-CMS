const inquirer = require('inquirer');
const viewAllDepartments = require('./config/viewDepartments');
const viewAllRoles = require('./config/viewRoles');
const viewAllEmployees = require('./config/viewEmployees');
const addDepartment = require('./config/addDepartment');
const addRole = require('./config/addRole');
const addEmployee = require('./config/addEmployee'); 
const updateRole = require('./config/updateRole');

const handleUserAction = async (choice) => {
    switch (choice) {
        case "View All Departments":
            await viewAllDepartments();
            break;
        case "View All Roles":
            await viewAllRoles();
            break;
        case "View All Employees":
            await viewAllEmployees();
            break;
        case "Add a Department":
            await addDepartment();
            break;
        case "Add a Role":
            await addRole();
            break;
        case "Add an Employee":
            await addEmployee();
            break;
        case "Update an Employee Role":
            await updateRole();
            break;
        default:
            console.log("Invalid option selected.");
            break;
    }
};

const promptUser = async () => {
    try {
        const { options } = await inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "options",
                choices: [
                    "View All Departments", 
                    "View All Roles", 
                    "View All Employees", 
                    "Add a Department", 
                    "Add a Role", 
                    "Add an Employee", 
                    "Update an Employee Role",
                    "Exit"
                ]
            }
        ]);
        
        if (options === "Exit") {
            console.log("Goodbye!");
            return; 
        }
        await handleUserAction(options);
        promptUser();
    } catch (error) {
        console.error("Prompt Error", error);
    }
};

promptUser();
