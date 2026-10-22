import express from 'express';
import * as olvaso from './utils/olvaso.js';

const app = express();

app.get("/",(req,res) => {
    res.status(200).send("váltunk");
});

app.get("/homerseklet",(req,res) => {
    const { c, f } = req.query;

    if(c !== undefined && f !== undefined){
        res.status(400).send("túl sok a szám ennyit nem tudok számolni");
    }
    else if (f !== undefined) {
        const cel = (f - 32) * 5/9 
        res.status(200).send(`${f} °F = ${cel} °C`);
    }
    else if (c !== undefined){
        const far = c * 9/5 + 32
        res.status(200).send(`${c} °C = ${far} °F`);
    }
    else{
        res.status(400).send("mit szeretnél mit váltsak át ha nem írsz be semmit?");
    }
});

// b) Pénzváltó: GET /penz?forint=...&valuta=.... A valuta elhagyható, ilyenkor EUR. Kis- és nagybetűvel is működjön. 



// /penz?forint=10000 

// 10000 Ft = 25.00 EUR 

// /penz?forint=3600&valuta=USD 

// 3600 Ft = 10.00 USD 

// /penz?forint=100&valuta=jpy 

// 400 – Ismeretlen valuta. Választható: eur, usd, gbp 

// /penz?forint=-5 

// 400 

app.get("/penz", async (req,res) => {
    const { forint, valuta } = req.query;
    const data = JSON.stringify(await olvaso.olvas("./arfolyamok.json"));

    

    res.send(data)
});

app.get("/bmi",(req,res) => {
    const suly = Number(req.query.suly);
    let magassag = Number(req.query.magassag);
    magassag = magassag / 100;
    let bmi = 0;

    if(suly === undefined || magassag === undefined){
        res.status(400).send("mit szeretnél mit váltsak át ha nem írsz be semmit?");
    }
    else {
        bmi = (suly / (magassag * magassag)).toFixed(2) ;

        if(bmi <= 18.5){
            res.status(200).send(`BMI: ${bmi} (sovány)`);
        }
        else if(bmi <= 25){
            res.status(200).send(`BMI: ${bmi} (normál)`);
        }
        else if(bmi <= 30){
            res.status(200).send(`BMI: ${bmi} (túlsúlyos)`);
        }
        else{
            res.status(200).send(`BMI: ${bmi} (elhízott)`);
        }
    }
});

app.listen(3000,() => {
    console.log("http://localhost:3000");
});