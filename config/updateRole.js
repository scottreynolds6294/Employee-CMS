const inquirer = require('inquirer');
const client = require('../connections');

const updateRole = async () => {
    try {
        const { employeeName, newRole } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: 'Which employees role do you want to change?',
                choices: async () => {
                    const result = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                    return result.rows.map(employee => employee.name);
                }
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Which role should the employee be assigned to?',
                choices: async () => {
                    const result = await client.query('SELECT title FROM role');
                    return result.rows.map(role => role.title);
                }
            }
        ]);
        const employeeResult = await client.query('SELECT id from employee WHERE CONCAT(first_name, \' \', last_name) = $1',
            [employeeName]
        );
        const employeeId = employeeResult.rows[0].id;

        const roleResult = await client.query('SELECT id FROM role WHERE title = $1',
            [newRole]
        );
        const roleId = roleResult.rows[0].id;
        await client.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [roleId, employeeId]
        );

        console.log(`${employeeName} has been updated to role ${newRole}`);
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
};

module.exports = updateRole;