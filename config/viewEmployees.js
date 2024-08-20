const client = require('../connections');

const viewAllEmployees = async () => {
    try {
        const result = await client.query(`SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title AS title, 
    d.name AS department, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;`);
        console.table(result.rows);
    } catch (err) {
        console.error('Error retrieving employees:', err);
    }
};

module.exports = viewAllEmployees;