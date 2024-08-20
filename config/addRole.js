const inquirer = require('inquirer');
const client = require('../connections');

const addRole = async () => {
    try {
        const { roleName, roleSalary, roleDepartment } = await inquirer.prompt ([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
                validate: input => input ? true : 'Role name can not be empty'
            },

            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
                validate: input => input ? true : 'Salary can not be empty'
            },

            {
                type: 'list',
                name: 'roleDepartment',
                message: 'What department does the role belong to?',
                choices: async () => {
                    const result = await client.query('SELECT name FROM department');
                    return result.rows.map(department => department.name);
                }
            }
        ]);
        const result = await client.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, (SELECT id FROM department WHERE name = $3)) RETURNING *',
            [roleName, roleSalary, roleDepartment]
        );
        console.log('New Role added', result.rows[0]);
    } catch (err) {
        console.error('Error adding role:', err);
    }
};

module.exports = addRole;