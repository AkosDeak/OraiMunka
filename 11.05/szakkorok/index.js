import express from 'express';
import szakRoutes from './Routes/szakkorok.js';

const app = express();

app.use("/szakkorok",szakRoutes);

app.get("/", (req,res) => {
    res.status(200).send("Main")
})

app.listen(3000,() => {
    console.log("http://localhost:3000");
});