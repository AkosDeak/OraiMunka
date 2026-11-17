import express from 'express';
import albumok from './Routes/albumok.js';
import eloadok from './Routes/eloadok.js';
import mufajok from './Routes/mufajok.js';
import orszagok from './Routes/orszagok.js';
import statisztika from './Routes/statisztika.js';

const app = express();
app.use(express.json());

app.use("/albumok",albumok);
app.use("/eloadok",eloadok);
app.use("/mufajok",mufajok);
app.use("/orszagok",orszagok);
app.use("/statisztika",statisztika);

app.get("/", (req,res) => {
    res.status(200).json("zentar");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});