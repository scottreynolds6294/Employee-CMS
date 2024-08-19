const user = require('./connections');

const viewAllRoles = async () => {
    try {
        const result = await user.query('SELECT * FROM role');
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving roles:', err);
    }

};

module.exports = viewAllRoles;