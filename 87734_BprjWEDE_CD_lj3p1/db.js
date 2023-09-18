const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_countries'
})

const register = (username, email, password) => {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error registering user:', error);
        } else {
            console.log('User registered successfully');
        }
    });
};

module.exports = {
    register
};