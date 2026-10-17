import { Router } from 'express';
import pool from '../db.js'
const konyvekRoutes = Router();

konyvekRoutes.get("/",(req,res)=>{
    res.send("konyvek")
})

konyvekRoutes.get("/elerheto", async (req,res)=>{


    let sql = "SELECT * FROM `kolcsonzesek` WHERE visszahozva = 'true'";
    const [vissza] = await pool.query(sql);

    return res.status(200).json(vissza);
});

konyvekRoutes.delete("/:id", async (req,res) => {
    const id = req.params.id;
    let sql = "SELECT visszahozva FROM kolcsonzesek WHERE konyvId = ?;"
    const [asd] = await pool.query(sql,[id]);

    sql = "SELECT id FROM konyvek;"
    const [asdd] = await pool.query(sql,[id]);

    if(!asdd.some(e => e.id == id)){
        return res.status(409).send("ha nincs miert akarod torolni")
    }

    if(asd.some(e => e.visszahozva == "false")){
        return res.status(409).send("ha kolcson van adva nem lehet torolni")
    }
    sql = "DELETE FROM `konyvek` WHERE id = ?";
    try{
        await pool.query(sql,[id]);
    }
    catch{}

    return res.status(204).send("tobbe mar nincs vele problema")
});

export default konyvekRoutes;