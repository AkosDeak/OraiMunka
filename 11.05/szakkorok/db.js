import 'dotenv/config';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3309,
    database: process.env.DB_DATABASE || 'szakkorok'
};

const pool = mysql.createPool(dbConfig);

export default pool;