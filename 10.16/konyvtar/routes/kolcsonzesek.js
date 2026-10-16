import { Router } from 'express';
import pool from '../db.js'
const kolcsonzesRoutes = Router();

kolcsonzesRoutes.get("/", async (req,res) => {
    const {aktiv} = req.query
    let sql = "";
    if(aktiv === 'true'){
        sql = "SELECT kolcs.id,kolcs.konyvId,kolcs.olvasoId,kolcs.datum,kolcs.visszahozva,konyv.cim AS konyvCim,olvas.nev AS olvasoNev " +
        "FROM `kolcsonzesek` kolcs JOIN konyvek konyv ON konyv.id = kolcs.konyvId JOIN olvasok olvas ON olvas.id = kolcs.olvasoId WHERE kolcs.visszahozva = 'false';";
    }
    else{
        sql = "SELECT kolcs.id,kolcs.konyvId,kolcs.olvasoId,kolcs.datum,kolcs.visszahozva,konyv.cim AS konyvCim,olvas.nev AS olvasoNev " +
        "FROM `kolcsonzesek` kolcs JOIN konyvek konyv ON konyv.id = kolcs.konyvId JOIN olvasok olvas ON olvas.id = kolcs.olvasoId;";
    }

    let eredmeny = await pool.query(sql);

    res.status(200).json(eredmeny);
});

kolcsonzesRoutes.post("/", async (req,res) => {
    const { konyvId, olvasoId} = req.body;
    let datum = new Date().toISOString().slice(0, 10) 

    let sql = "INSERT INTO kolcsonzesek(konyvId,olvasoId,datum,visszahozva) VALUES (?,?,?,'false');"

    try{
        await pool.query(sql,[konyvId,olvasoId,datum]);
        return res.status(201).send("ok")
    }
    catch{
        return res.status(400).send("nem jo")
    }
});

kolcsonzesRoutes.patch("/:id/visszahoz", async (req,res) => {
    const id = req.params.id;
    let datum = new Date().toISOString().slice(0, 10) 

    let sql = "UPDATE kolcsonzesek SET datum = ?, visszahozva = 'true' WHERE id = ?;"

    try{
        await pool.query(sql,[datum,id]);
        return res.status(200).send("ok")
    }
    catch{
        return res.status(400).send("nem jo")
    }
});


export default kolcsonzesRoutes;