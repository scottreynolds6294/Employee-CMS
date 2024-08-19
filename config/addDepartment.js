const inquirer = require('inquirer');
const user = require('./connections');

const addDepartment = async () => {
    try {
        const { departmentName } = await inquirer.prompt ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department',
                validate: input => input ? true : 'Department name can not be empty'
            }
        ]);
        const result = await user.query(
            'INSERT INTO department (name) VALUES ($1) RETURNING *',
            [departmentName]
        );
        console.log('New department added:', result.rows[0]);
    } catch (err) {
        console.error('Error adding department:', err);
    }
};

module.exports = addDepartment;