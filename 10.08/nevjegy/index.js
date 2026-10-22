import express from 'express'

const app = express();

const hobbi = ["foci", "programozás", "gitár"];

app.get("/",(req,res) => {
    res.status(200).type('text/plain').send("Üdvözöllek a névjegy oldalamon!");
});

app.get("/nev",(req,res) => {
    res.status(200).type('text/plain').send("A nevem: Deák Ákos");
});

app.get("/osztaly",(req,res) => {
res.status(200).type('text/plain').send("Osztályom: 13.C ");
});

app.get("/eletkor",(req,res) => {
    const year = new Date().getFullYear() 
    const kor = year - 2007 
    res.status(200).type('text/plain').send(`${kor} éves vagyok (vagy leszek idén).`);
});

app.get("/hobbik",(req,res) => {
    
    let hobbik = [];
    hobbik = hobbi.map((h, i) =>` ${i+1}.  ${h} `).join('\n');

    res.status(200).type('text/plain').send(hobbik);
});

app.get("/hobbik/:id",(req,res) => {
    const id = req.params.id;
    if(id <= 3){
        res.status(200).send(hobbi[id]);
    }
    else{
        res.status(404).type('text/plain').send(`Nincs ${id}. hobbim.`);
    }
});

app.use((req,res) => {
    res.status(404).type('text/plain').send(`Hoppá! A(z) ${req.path} oldal nem létezik.`)
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
});