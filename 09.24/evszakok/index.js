import express from "express";
const app = express();

app.get("/osz",(req,res) => {
    res.send("Ősz");
});

app.get("/tel",(req,res) => {
    res.send("Tél");
});

app.get("/tavasz",(req,res) => {
    res.send("Tavasz");
});

app.get("/nyar",(req,res) => {
    res.send("Nyár");
});

app.listen(3000,() => {
    console.log("http://localhost:3000/osz");
});