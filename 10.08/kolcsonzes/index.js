import express from 'express';
import * as reader from "./utils/reader.js";

const app = express();

app.get("/", (req,res) => {
    res.status(200).send("Kölcsönzünk");
});

app.get("/kolcsonzesek", async (req,res) => {

    const {aktiv} = req.query;

    try{
        const kolcsonzesek = await reader.read("./data/kolcsonzesek.json");
        const konyvek = await reader.read("./data/konyvek.json");
        const olvasok = await reader.read("./data/olvasok.json");
        if(aktiv === "true")
        {
            const vissza = kolcsonzesek.map(k => ({ ...k, konyvCim: konyvek.find(konyv => konyv.id === k.konyvId)?.cim, olvasoNev: olvasok.find(olvaso => olvaso.id === k.olvasoId)?.nev}))

            return res.status(200).json(vissza);

        }
        return res.status(200).json(kolcsonzesek.map(k => ({ ...k, konyvCim: konyvek.find(konyv => konyv.id === k.konyvId)?.cim, olvasoNev: olvasok.find(olvaso => olvaso.id === k.olvasoId)?.nev})));
    }
    catch(err){
        console.log(err)
        res.status(500).json("error");
    }

    
});


app.listen(3000, () => {
    console.log("http://localhost:3000");
});