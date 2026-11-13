import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {

    let sql = "";

    sql = "SELECT v.orszag, COUNT(DISTINCT v.id) AS varosDb, COUNT(sz.id) AS szallasDb, ROUND(AVG(sz.ertekeles),1) AS atlagErtekeles FROM varosok v LEFT JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.orszag;";

    try{
        const [data] = await pool.query(sql);

        res.status(200).json(data);
    }
    catch(err){
        console.log(err)
        return res.status(500).json("belso hiba");
    }
});

export default app;