const user = require('./connections');

const viewAllDepartments = async () => {
    try {
        const result = await user.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving departments:', err);
    }
};

module.exports = viewAllDepartments;