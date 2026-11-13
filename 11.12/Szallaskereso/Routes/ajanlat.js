import express from 'express';
import pool from '../Utils/db.js';

const app = express.Router();

app.get("/", async (req,res) => {

    const {varos, ej, fo} = req.query;

    let sql = "";

        if (!ej || !fo || !varos) {
        let err = [];

        if(!ej){
            err.push("ejszaka hianyzik");
        };
        if(!fo){
            err.push("fo hianyzik");
        };
        if(!varos){
            err.push("varos hianyzik");
        };

        return res.status(400).json(err);
    };

    if (isNaN(ej) || isNaN(fo)) {
        return res.status(400).json("szam kene");
    };

    sql = "SELECT nev FROM varosok";

    const [nev] = await pool.query(sql);

    if (ej <= 0 || fo <= 0 || !nev.some(x => x.nev === varos)) {
        return res.status(404).json("0 folott kell lennie mindennek es ismert varos kell");
    };

    sql = "SELECT sz.nev AS szallas,sz.csillag,sz.ar AS arFoEj,sz.ar * ? * ? AS osszesen FROM szallasok sz JOIN varosok v ON v.id = sz.varos_id WHERE v.nev = ?;";

    try{
        const [data] = await pool.query(sql,[Number(ej),Number(fo),varos]);

        let result = {
            varos : varos,
            ej : ej,
            fo : fo,
            ajanlatok : data
        };

        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("belso hiba");
    };
});

export default app;