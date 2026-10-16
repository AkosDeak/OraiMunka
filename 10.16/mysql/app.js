import express from 'express'
import pool from './db.js';

const app = express();

app.get("/",(req,res) => {
    res.send("film mar sokadik");
});

app.get("/filmek", async (req,res) => {
    let sql = 'SELECT * FROM filmek';
    let eredmeny = await pool.query(sql);

    res.json(eredmeny);
});

app.get("/filmek/:id", async (req,res) => {
    const id = req.params.id;
    let sql = `SELECT * FROM filmek WHERE id = ?`;
    let eredmeny = await pool.query(sql, [id]);
    
    
    res.json(eredmeny);
});


app.listen(3000,() => {
    console.log("http://localhost:3000");
});