const user = require('./connections');

const viewAllEmployees = async () => {
    try {
        const result = await user.query('SELECT * FROM employee');
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving employees:', err);
    }
};

module.exports = viewAllEmployees;