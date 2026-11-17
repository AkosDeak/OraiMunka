import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {
    let sql = "";

    try {
        sql = "SELECT mufaj,COUNT(mufaj) AS albumDb,SUM(hossz) AS osszHossz FROM albumok GROUP BY mufaj;";
        const [data] = await pool.query(sql);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("belso hiba");
    }
});

export default app;