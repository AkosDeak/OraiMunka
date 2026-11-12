import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'szallasok',
    port: process.env.DB_PORT || 3309,
    password: process.env.DB_PASSWORD || ''
};

const pool = mysql.createPool(dbConfig);

export default pool;