const inquirer = require('inquirer');
const client = require('../connections');

const addEmployee = async () => {
    try {
        const { firstName, lastName, employeeRole, employeeManager } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?',
                validate: input => input ? true : 'Employee first name must not be empty'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?',
                validate: input => input ? true : 'Employee last name must not be empty'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'What is the employee\'s role?',
                choices: async () => {
                    const result = await client.query('SELECT id, title FROM role');
                    return result.rows.map(role => role.title);
                }
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: 'Who is the employee\'s manager?',
                choices: async () => {
                    const result = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                    return [...result.rows.map(employee => employee.name), 'None'];
                }
            }
        ]);

        let managerId;
        if (employeeManager === 'None') {
            managerId = null;
        } else {
            const managerResult = await client.query(
                'SELECT id FROM employee WHERE CONCAT(first_name, \' \', last_name) = $1',
                [employeeManager]
            );
            managerId = managerResult.rows[0].id;
        }

        const result = await client.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, (SELECT id FROM role WHERE title = $3), $4) RETURNING *`,
            [firstName, lastName, employeeRole, managerId]
        );

        const { first_name, last_name } = result.rows[0];
        console.log(`${first_name} ${last_name} added`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
};

module.exports = addEmployee;
