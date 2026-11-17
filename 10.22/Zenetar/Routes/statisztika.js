import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/eloadok", async (req,res) => {
    let sql = "";
    try {
        sql = "SELECT e.nev AS eloado, COUNT(a.id) AS albumDb, MIN(a.ev) AS elso, MAX(a.ev) AS utolso FROM eloadok e LEFT JOIN albumok a ON a.eloado_id = e.id GROUP BY e.id, e.nev ORDER BY albumDb DESC, e.nev ASC;"
        const [data] = await pool.query(sql);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json("belso hiba");
    }
});

export default app;