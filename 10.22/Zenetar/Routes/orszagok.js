import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {
    let sql = "";

    try {
        sql = "SELECT e.orszag,COUNT(DISTINCT e.id) AS eloadoDb,COUNT(a.id) AS albumDb FROM eloadok e LEFT JOIN albumok a ON a.eloado_id = e.id GROUP BY e.orszag;";
        const [data] = await pool.query(sql);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("belso hiba");
    }
});

export default app;