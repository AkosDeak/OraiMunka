// Metódus     Útvonal     Siker Hiba
// GET   `/termekek` 200   –
// GET   `/termekek/:id`   200   404
// POST  `/termekek` **201** + az új termék  400
// PUT   `/termekek/:id`   200 + a módosított termék     400, 404
// PATCH `/termekek/:id`   200 + a módosított termék     400, 404
// DELETE      `/termekek/:id`   **204** (üres válasz)   404

// **Ellenőrzési szabályok** (POST és PUT: minden mező kötelező; PATCH: csak a megadott mezőket ellenőrizd):
// - `nev`, `kategoria`: nem üres szöveg
// - `ar`: pozitív szám
// - `keszlet`: nemnegatív **egész** szám

import express from "express";
import fs from "fs/promises";

const app = express();
app.use(express.json());

const read = async () => {
    const data = await fs.readFile("termekek.json", "utf-8");
    return JSON.parse(data);
}

app.get("/", (req, res) => {
    res.status(200).send("bolt ami papir");
});

app.get("/termekek", async (req, res) => {
    const termekek = await read();
    res.status(200).json(termekek);
});

app.get("/termekek/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const termekek = await read();
        const termek = termekek.filter((termek) => termek.id === id);
        
        if (termek.length === 0) {
            return res.status(404).json({ error: "Termék nem található." });
        }

        res.status(200).json(termek);
    }
    catch (error) {
        return res.status(500).json({ error: "Hiba történt az adatok beolvasása közben." });
    }
});

app.post("/termekek", async (req, res) => {
    const { nev, kategoria, ar, keszlet } = req.query;
    let termekek = [] 
    if (nev != undefined && kategoria != undefined && (!isNaN(ar) && ar > 0) && (!isNaN(keszlet) && keszlet >= 0 && Number.isInteger(Number(keszlet))))
        {
            try {
                const adatok = { nev, kategoria, ar, keszlet };
                termekek = await read();
                termekek.push(adatok)
                await fs.writeFile("./termekek.json",JSON.stringify(termekek, null, 2),"utf8")
                res.status(201).json(termekek)
            }
            catch (err)
            {
                console.log(err)
                res.status(500).send("Szerverhiba");
            }
        }
    else
    {
        res.status(400).send("hibas adatok")
    }
});

app.put("/termekek/:id", async (req, res) => {
    const { unev, ukategoria, uar, ukeszlet } = req.query;
    const id = parseInt(req.params.id);

    if (nev != undefined && kategoria != undefined && (!isNaN(ar) && ar > 0) && (!isNaN(keszlet) && keszlet >= 0 && Number.isInteger(Number(keszlet))))
        {
            
            try {
                let ujadatok = { unev, ukategoria, uar, ukeszlet };
                const adatok = { nev, kategoria, ar, keszlet };
                
                const termekek = await read();
                const termek = termekek.filter((termek) => termek.id === id);

                adatok = termek;
                
                adatok.nev = ujadatok.unev;
                adatok.kategoria = ujadatok.ukategoria;
                adatok.ar = ujadatok.uar;
                adatok.keszlet = ujadatok.ukeszlet;

                res.status(200).json(termek)
            }
            catch (err)
            {
                console.log(err)
                res.status(500).send("Szerverhiba");
            }
        }
    else
    {
        res.status(400).send("hibas adatok")
    }
});

app.patch("/termekek/:id", async (req, res) => { 

});

app.delete("/termekek/:id", async (req, res) => {
    const id = req.params.id;
    const termekek = await read();
    const termek = termekek.filter((termek) => termek.id === id);

    res.status(204)
    console.log(termek)

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});