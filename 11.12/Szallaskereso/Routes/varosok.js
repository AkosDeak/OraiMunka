import express from 'express';
import pool from '../Utils/db.js'

const app = express.Router();

app.get("/", async (req,res) => {
    let sql;
    const { minSzallas } = req.query;

    if (minSzallas) {
        sql = "SELECT v.id,v.nev,v.orszag,COUNT(sz.id) AS szallasDb,MIN(ar) AS legolcsobb,ROUND(AVG(sz.ar)) AS atlagAr FROM varosok v JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.nev HAVING COUNT(sz.id) >= ? ORDER BY v.nev";
        const [data] = await pool.query(sql,[minSzallas])
        return res.status(200).json(data)
    }


    sql = "SELECT v.id,v.nev,v.orszag,COUNT(sz.id) AS szallasDb,MIN(ar) AS legolcsobb,ROUND(AVG(sz.ar)) AS atlagAr FROM varosok v JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.nev ORDER BY v.nev"



    const [data] = await pool.query(sql)

    res.status(200).json(data)
})

export default app;