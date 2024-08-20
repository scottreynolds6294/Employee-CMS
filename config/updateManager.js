const inquirer = require('inquirer');
const client = require('../connections');

const updateEmployeeManager = async () => {
    try {
        const { employeeName, newManager } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: 'Which employee\'s manager do you want to update?',
                choices: async () => {
                    const result = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                    return result.rows.map(employee => ({
                        name: employee.name,
                        value: employee.id
                    }));
                }
            },
            {
                type: 'list',
                name: 'newManager',
                message: 'Who is the new manager for this employee?',
                choices: async () => {
                    const result = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                    return [
                        ...result.rows.map(employee => ({
                            name: employee.name,
                            value: employee.id
                        })),
                        { name: 'None', value: null }
                    ];
                }
            }
        ]);

        await client.query(
            'UPDATE employee SET manager_id = $1 WHERE id = $2',
            [newManager, employeeName]
        );

        console.log(`Employee's manager has been updated successfully!`);
    } catch (err) {
        console.error('Error updating employee manager:', err);
    }
};

module.exports = updateEmployeeManager;

