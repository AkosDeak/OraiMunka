import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {

    let sql = "";
    const { mufaj, tol, ig } = req.query;



    if (mufaj || tol || ig) {

        sql = "SELECT * FROM albumok WHERE 1";
        let param = [];

        if (mufaj && isNaN(mufaj)) {
            sql += " AND mufaj = ?";
            param.push(mufaj);
        }
        else if(mufaj && !isNaN(mufaj)){
            return res.status(400).json("mufaj kene");
        };
        if (tol && !isNaN(tol)) {
            sql += " AND ev >= ?";
            param.push(tol);
        }
        else if(tol && isNaN(tol)){
            return res.status(400).json("tol kene");
        };
        if (ig && !isNaN(ig)) {
            sql += " AND ev <= ?";
            param.push(ig);
        }
        else if(ig && isNaN(ig)){
            return res.status(400).json("ig kene");
        };

        try {
            const [data] = await pool.query(sql,param);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json("belso hiba");
        }
    }

    sql = "SELECT a.id,e.nev,a.cim,a.ev,a.mufaj,a.hossz FROM albumok a JOIN eloadok e ON e.id = a.eloado_id ORDER BY a.ev,a.cim ASC;";

    try {
        const [data] = await pool.query(sql);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json("belso hiba");
    }
});

app.get("/kereses", async (req,res) => {
    
    const { q } = req.query;
    let sql = "";

    

    if (!q || q.length < 2) {
        return res.status(400).json("keresesi parameter hianyzik");
    };
    
    try {
        const like = `%${q}%`;
        
        sql = "SELECT * FROM albumok WHERE cim LIKE ?;";
        const [album] = await pool.query(sql,[like]);

        sql = "SELECT * FROM eloadok WHERE nev LIKE ?;";
        const [eloadok] = await pool.query(sql,[like]);

        const result = {
            albumok: album,
            eloadok: eloadok
        };

        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        return res.status(500).json("belso hiba");
    };
});

export default app;