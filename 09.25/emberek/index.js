import express from "express";
import fs from "fs/promises"
const app = express();

async function adatokbeolvasasa() {
    try{
        const data = await fs.readFile("emberek.json","utf-8");
        const jsondata = JSON.parse(data);
        return jsondata
    }
    catch(error) {
        console.log("hiba",error)
        return [];
    }
}

app.get("/nok", async (req,res) => {
    try{
        const adatok = await adatokbeolvasasa();
        const nok = adatok.filter((ember) => ember.nem === "no");
        res.json(nok)
    }
    catch(error){
        res.status(500).send("hiba")
    }
});

app.get("/ferfiak", async (req,res) => {
    try{
        const adatok = await adatokbeolvasasa();
        const nok = adatok.filter((ember) => ember.nem === "ferfi");
        res.json(nok)
    }
    catch(error){
        res.status(500).send("hiba")
    }
});

app.listen(3000,() => {
    console.log("http://localhost:3000/");
});