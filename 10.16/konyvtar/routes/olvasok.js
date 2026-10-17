import { json, Router } from "express";
import pool from "../db.js"
const olvasokRoutes = Router();

olvasokRoutes.get("/", (req,res) => {
    res.status(200).send("emberek")
})

olvasokRoutes.get("/:id/kolcsonzesek", async (req,res) => {
    const id = req.params.id;
    let sql = "SELECT nev FROM olvasok WHERE id = ?"
    const [nev] = await pool.query(sql,[id])

    sql = "SELECT k.cim FROM kolcsonzesek ko JOIN konyvek k ON k.id = ko.konyvId WHERE olvasoId = ?;"
    const [kolcs] = await pool.query(sql,[id])

    const combined = [...nev, kolcs];

    res.status(200).json(combined)
})

export default olvasokRoutes