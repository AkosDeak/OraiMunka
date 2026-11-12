import express from 'express';

const app = express.Router();

app.get("/", (req,res) => {
    res.status(200).json("szallasok")
})

export default app;