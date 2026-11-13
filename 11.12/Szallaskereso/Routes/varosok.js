import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/:id/szallasok", async (req,res) => {
    const id = req.params.id;
    let sql = "";

    sql = "SELECT COUNT(varosok.id) AS number from varosok";

    const [number] = await pool.query(sql);

    if (id > number[0].number) {
        return res.status(404).json("nem jo");
    };

    sql = "SELECT sz.id,sz.nev,sz.csillag,sz.ar,sz.medence,sz.ertekeles FROM varosok v JOIN szallasok sz ON sz.varos_id = v.id WHERE v.id = ?;";

    const [data] = await pool.query(sql,[id]);

    return res.status(200).json(data);
})

app.get("/", async (req,res) => {
    let sql;
    const { minSzallas } = req.query;

    if (minSzallas) {
        sql = "SELECT v.id,v.nev,v.orszag,COUNT(sz.id) AS szallasDb,MIN(ar) AS legolcsobb,ROUND(AVG(sz.ar)) AS atlagAr FROM varosok v JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.nev HAVING COUNT(sz.id) >= ? ORDER BY v.nev";
        const [data] = await pool.query(sql,[minSzallas]);
        return res.status(200).json(data);
    };

    sql = "SELECT v.id,v.nev,v.orszag,COUNT(sz.id) AS szallasDb,MIN(ar) AS legolcsobb,ROUND(AVG(sz.ar)) AS atlagAr FROM varosok v JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.nev ORDER BY v.nev";

    try{
        const [data] = await pool.query(sql);

        res.status(200).json(data);
    }
    catch(err){
        console.log(err)
        return res.status(500).json("belso hiba");
    }
})

export default app;