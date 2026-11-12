import express from 'express';

const app = express.Router();

app.get("/", (req,res) => {
    res.status(200).json("orszagok")
})

export default app;