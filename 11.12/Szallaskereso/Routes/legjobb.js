import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/:num", async (req,res) => {

    const num = req.params.num;
    let sql = "";

    sql = "SELECT nev FROM `szallasok` ORDER BY ertekeles DESC LIMIT ?;";


    if (!num || isNaN(num) || Number(num < 0)) {
        return res.status(400).json("pozitiv szam kell");
    };

    try{

        const [data] = await pool.query(sql,[Number(num)]);

        const result = data.map(x => x.nev);

        return res.status(200).json(result.join(", "));
    }
    catch(err){
        console.log(err);
        return res.status(500).json("belso hiba");
    };
});

export default app;