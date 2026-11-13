import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {

    let sql = "";

    const { varos, minCsillag, maxAr, medence, id} = req.query;

    if (id) {
       sql = "SELECT * FROM szallasok WHERE id = ?";
       
        try{
            let [data] = await pool.query(sql,[id]);

            if (data.length == 0) {
                return res.status(404).json("nem jo");
            };

            return res.status(200).json(data);
        }
        catch(err){
            console.log(err);
            return res.status(500).json("nem jo");
        };
    };

    if (Object.keys(req.query).length >= 1) {

        sql = "SELECT * FROM szallasok sz JOIN varosok v ON v.id = sz.varos_id WHERE 1";
        let query = [];
        let med = 0;

        if (medence == "true") {
            med = 1;
        }
        else if (medence == "false") {
            med = 0;
        }
        else{
            return res.status(400).json("nem jo");
        };

        if (varos) {
            sql += " AND v.nev = ?";
            query.push(varos);
        };

        if(minCsillag){
            sql += " AND sz.csillag >= ?";
            query.push(minCsillag);
        };

        if (maxAr) {
            sql += " AND sz.ar <= ?";
            query.push(maxAr);
        };

        if (medence) {
            sql += " AND sz.medence = ?";
            query.push(med);
        };

        try{
            const [data] = await pool.query(sql,query);
            return res.status(200).json(data);
        }
        catch(err){
            console.log(err);
            return res.status(500).json("belso hiba");
        };
    };

    sql = "SELECT * FROM szallasok ORDER BY szallasok.ar ASC;";
    
    try{
        const [data] = await pool.query(sql);

        res.status(200).json(data);
    }
    catch(err){
        console.log(err)
        return res.status(500).json("belso hiba");
    };
});

export default app;