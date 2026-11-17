import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/:id", async (req,res) => {
    let sql = "";
    const id = req.params.id
    sql = "SELECT * FROM eloadok WHERE id = ?";

    if (isNaN(id)) {
        return res.status(400).json("szam kene")
    }

    try {
        const [eloadok] = await pool.query(sql,[id]);

        if (eloadok.length == 0) {
            return res.status(404).json("nincs ilyen eloado id")
        };

        sql = "SELECT * FROM albumok WHERE eloado_id = ?";

        try {
            const [albumok] = await pool.query(sql,[id]);

            const result = {
                eloadok,
                albumok : albumok
            };

            res.status(200).json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json("belso hiba");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json("belso hiba");
    }
});

app.get("/", async (req,res) => {

    let sql = "";

    const {orszag} = req.query;

    if(orszag && isNaN(orszag)){

        sql = "SELECT * FROM eloadok WHERE orszag = ? ORDER BY nev ASC;";

        try {
            const [data] = await pool.query(sql,[orszag]);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json("belso hiba");
        };
    };

    sql = "SELECT * FROM eloadok ORDER BY nev ASC;";
    try{
        const [data] = await pool.query(sql);
        return res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("belso hiba")
    }; 
});

export default app;