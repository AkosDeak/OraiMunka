import express from 'express';
const app = express();

function konvertszamma(param){
    if(param === undefined || param === null || param === ''){
        return undefined;
    }
    return Number(param);
}

app.get("/", (req,res) => {
    res.status(200).send("nagyon para");
});

// app.get("/filmek", (req,res) => {
//     //const mufaj = req.query.mufaj;
//     //const tol = req.query.tol;
//     //const ig = req.query.ig
//     const {mufaj, tol, ig} = req.query;
//     if (!mufaj || !tol || !ig) {
//         return res.status(400).json("3 paraméter kéne!")
//     };
//     res.status(200).json({
//         "műfaj": mufaj,
//         "tól": tol,
//         "ig": ig
//     });
// });

app.get("/filmek/:evszam", (req,res) => {

    let {mufaj, tol, ig} = req.query;
    let {evszam} = req.params;

    if (!mufaj || !tol || !ig) {
        return res.status(400).json("3 paraméter kéne!")
    };

    tol = konvertszamma(tol);
    ig = konvertszamma(ig);
    evszam = konvertszamma(evszam);

    res.status(200).json({
        "műfaj": mufaj + " " + typeof mufaj,
        "tól": tol + " " + typeof tol,
        "ig": ig + " " + typeof ig,
        "évszám": evszam + " " + typeof evszam,
        "tartományban": evszam >= tol && evszam <= ig
    });
});


app.listen(3000, () => {
    console.log("http://localhost:3000");
});