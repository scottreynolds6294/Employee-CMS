const inquirer = require('inquirer');
const user = require('./connections');

const addEmployee = async () => {
    try {
        const { firstName, lastName, employeeRole, employeeManager } = await inquirer.prompt ([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name?',
                validate: input => input ? true : 'Employee first name must not be empty'
            },

            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name?',
                validate: input => input ? true : 'Employee last name must not be empty'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'What is the employees role?',
                choices: async () => {
                    const result = await user.query('SELECT title FROM role');
                    return result.row.map(role = role.title)
                }
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: 'Who is the employees manager?',
                choices: async () => {
                    const result = await user.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                    return [...result.rows.map(employee => employee.name), 'None'];
                }
            }
        ]);
        let managerId;
        if (employeeManager === 'None') {
            managerId = null;
        } else {
            const managerResult = await user.query(
                'SELECT id from employee WHERE CONCAT(first_name, \' \', last_name) = $1',
                [employeeManager]
            );
            managerId = managerResult.rows[0].id;
        }
        const result = await user.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, (SELECT id FROM role WHERE title = $3), $4) RETURNING *`,
            [firstName, lastName, employeeRole, managerId]
        );
        const { first_name, last_name} = result.rows[0];
        console.log(`${first_name} ${last_name} added`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
};

module.exports = addEmployee;