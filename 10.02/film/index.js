import express from 'express';
import fs from 'fs/promises';
const app = express();

const olvas = async () => {

    const data = await fs.readFile("./filmek.json", "utf-8");

    return JSON.parse(data);
};

// `GET /filmek/99`  **404** – `{"hiba":"Nincs ilyen film"}`

app.get('/', (req, res) => {
  res.status(200).send("nagyon film");
});

// `GET /filmek`     az összes film
app.get('/filmek', async (req, res) => {
    try {
        const filmek = await olvas();

        res.status(200).json(filmek);

    } catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek?mufaj=sci-fi`    szűrés műfajra
app.get('/filmek/mufaj', async (req, res) => {
    try {
        const filmek = await olvas();

        const mufaj = req.query.mufaj;

        const mufajFilmek = filmek.filter((film) => film.mufaj === mufaj);

        res.status(200).json(mufajFilmek);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek?min=8.5`   legalább ilyen értékelésű filmek
app.get('/filmek/min', async (req, res) => {
    try {
        const filmek = await olvas();

        const min = req.query.min;

        const ertekeles = filmek.filter((film) => film.ertekeles >= min);

        res.status(200).json(ertekeles);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek?tol=1990&ig=1999`      megjelenési év szerinti szűrés (bármelyik elhagyható)
app.get('/filmek/tol-ig', async (req, res) => {
    try {
        const filmek = await olvas();

        const tol = req.query.tol;
        const ig = req.query.ig;

        if ((isNaN(tol) || tol < 0) || (isNaN(ig) || ig < 0)) {
            res.status(400).json({ hiba: "A 'tol' és 'ig' paramétereknek pozitív számnak kell lenniük" });
            return;
        }

        const ev = filmek.filter((film) => film.ev >= tol && film.ev <= ig);

        res.status(200).json(ev);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek?rendez=ev` rendezés: `cim` (ábécé), `ev` (növekvő), `ertekeles` (csökkenő)
app.get('/filmek/rendez', async (req, res) => {
    try {
        const filmek = await olvas();
        const rendez = req.query.rendez;

        if (rendez === "cim") {
            filmek.sort((a, b) =>  a.cim.localeCompare(b.cim));    
            res.status(200).json(filmek);
        };

        if (rendez === "ev") {
            filmek.sort((a, b) => a.ev - b.ev);
            res.status(200).json(filmek);
        };

        if (rendez === "ertekeles") {
            filmek.sort((a, b) => b.ertekeles - a.ertekeles);
            res.status(200).json(filmek);
        };
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek/cimek`     csak a címek tömbje
app.get('/filmek/cimek', async (req, res) => {
    try {
        const filmek = await olvas();

        const cim = filmek.map((film) => film.cim);

        res.status(200).json(cim);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});


// `GET /filmek/rendezo/nolan`   rendezőre keresés, **részleges és kisbetű-nagybetű független**
app.get('/filmek/rendezo/:rendezo', async (req, res) => {
    try {
        const filmek = await olvas();
        
        const rendezo = req.params.rendezo;

        const keresettRendezo = filmek.filter((film) => film.rendezo.toLowerCase().includes(rendezo.toLowerCase()));
        res.status(200).json(keresettRendezo);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});

// `GET /filmek/5`   egy film
app.get('/filmek/:id', async (req, res) => {
    try {
        const filmek = await olvas();
        
        const id = Number(req.params.id);

        const keresettFilm = filmek.filter((film) => film.id === id);

        res.status(200).json(keresettFilm);
    }
    catch (error) {
        res.status(500).json({ hiba: "Hiba történt az adatok olvasása során" });
    }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});