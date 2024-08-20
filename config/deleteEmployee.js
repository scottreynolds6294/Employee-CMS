const inquirer = require('inquirer');
const client = require('../connections');

const deleteEmployee = async () => {
    try {
        const { employeeName } = await inquirer.prompt({
            type: 'list',
            name: 'employeeName',
            message: 'Which employee would you like to delete?',
            choices: async () => {
                const result = await client.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee');
                return result.rows.map(employee => ({
                    name: employee.name,
                    value: employee.id
                }));
            }
        });

        await client.query(
            'DELETE FROM employee WHERE id = $1',
            [employeeName]
        );

        console.log('Employee has been deleted.');
    } catch (err) {
        console.error('Error deleting employee:', err);
    }
};

module.exports = deleteEmployee;
