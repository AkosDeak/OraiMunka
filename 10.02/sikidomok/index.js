import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("nagyon sík");
});

// `GET /kocka/-1`   **400** – `Hiba: csak pozitív számokat adhatsz meg!`

// `GET /teglalap/3/4`     `Téglalap (3 x 4): T = 12, K = 14`
app.get("/teglalap/:a/:b", (req, res) => {

    const a = req.params.a;
    const b = req.params.b;

    if((isNaN(a) || a <= 0) || (isNaN(b) || b <= 0))
    {
        return res.status(400).send("Hiba: csak pozitív számokat adhatsz meg!");
    }

    const T = a * b;
    const K = 2 * a + 2 * b;

    res.status(200).send(`Téglalap (${a} x ${b}): T = ${T}, K = ${K}`);
});

// `GET /kor/2`      `Kör (r = 2): T = 12.57, K = 12.57`
app.get("/kor/:r", (req, res) => {

    const r = req.params.r;

        if((isNaN(r) || r <= 0))
    {
        return res.status(400).send("Hiba: csak pozitív számokat adhatsz meg!");
    }

    const T = 3.14 * r * r;
    const K = 2 * 3.14 * r;

    res.status(200).send(`Kör (r = ${r}): T = ${T}, K = ${K}`);
});

// `GET /haromszog/6/4`    `Háromszög (a = 6, m = 4): T = 12`
app.get("/haromszog/:a/:m", (req,res) => {

    const a = req.params.a;
    const m = req.params.m;

    if((isNaN(a) || a <= 0) || (isNaN(m) || m <= 0))
    {
        return res.status(400).send("Hiba: csak pozitív számokat adhatsz meg!");
    }

    const T = 0.5 * a * m;

    res.status(200).send(`Háromszög (a = ${a}, m = ${m}): T = ${T}`);
});

// `GET /kocka/3`    `Kocka (a = 3): V = 27, A = 54`
app.get("/kocka/:a", (req,res) => {
    const a = req.params.a;
    
    if(isNaN(a) || a <= 0)
    {
        return res.status(400).send("Hiba: csak pozitív számokat adhatsz meg!");
    }

    const V = a * a * a;
    const A = 6 * (a * a);

    res.status(200).send(`Kocka (a = ${a}): V = ${V}, A = ${A}`);
});

// `GET /fuggvenyek` `A sikidomok modul függvényei: haromszogTerulet, korKerulet, ...`
app.get("/fuggvenyek", (req,res) => {

    res.status(200).send("A sikidomok modul függvényei: Téglalap: /teglalap/3/4 , Kör: /kor/2 , Háromszög: /haromszog/6/4 , Kocka: /kocka/3");

});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});