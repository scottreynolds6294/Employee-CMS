const client = require('../connections');

const viewAllRoles = async () => {
    try {
        const result = await client.query(`SELECT
    role.id, 
    role.title AS title, 
    department.name AS department, 
    role.salary
    FROM role
    JOIN department ON role.department_id = department.id;`);
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving roles:', err);
    }

};

module.exports = viewAllRoles;