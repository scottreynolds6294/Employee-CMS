const client = require('../connections');

const viewAllDepartments = async () => {
    try {
        console.log('Fetching all departments...');
        const result = await client.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving departments:', err.message);
    }
};

module.exports = viewAllDepartments;
