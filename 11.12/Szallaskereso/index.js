import express from 'express';

import szallasok from './Routes/szallasok.js';
import ajanlat from './Routes/ajanlat.js';
import legjobb from './Routes/legjobb.js';
import orszagok from './Routes/orszagok.js';
import varosok from './Routes/varosok.js';

const app = express();

app.use(express.json());

app.use("/szallasok",szallasok);
app.use("/ajanlat",ajanlat);
app.use("/legjobb",legjobb);
app.use("/orszagok",orszagok);
app.use("/varosok",varosok);

app.get("/", (req,res) => {
    res.status(200).json("szallaskereso");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});