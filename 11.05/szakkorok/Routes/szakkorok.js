import { Router } from "express";
import pool from "../db.js";

const szakRoutes = Router();

szakRoutes.get("/", async (req,res) => {

    const sql = "SELECT * FROM diakok"
    
    const [data] = await pool.query(sql);

    res.status(200).json(data);
});



export default szakRoutes;