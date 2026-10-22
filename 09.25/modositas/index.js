import { error } from "console";
import express from "express";
import fs from "fs/promises";
const app = express();
app.use(express.json());

async function beolvasas() {
    try{
        const data = await fs.readFile("emberek.json","utf-8");
        return JSON.parse(data);
    }
    catch(error){
        console.log(error);
        return [];
    }
}

async function iras(emberek) {
    try{
        await fs.writeFile("emberek.json",JSON.stringify(emberek,null,2));
    }
    catch(error){
        console.error(error);
    }
}

app.get("/mindenki", async (req,res) => {
    try{
        const emberek = await beolvasas();
        res.send(emberek)
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.patch("/mod/:id", async (req,res) => {
    const id = req.params.id;
    if(parseInt(id)<0 || isNaN(parseInt(id)))
    {
        return res.status(400);
    }
    const {ujkor} = req.body;
    if(ujkor === undefined){
        return res.status(400);
    }
    if(isNaN(parseInt(ujkor))){
        res.status(400);
    }
    try{
        const emberek = await beolvasas();
        const index = emberek.findIndex((emberek) => emberek.id === parseInt(id));
        if(index === -1){
            return res.status(404);
        }
        emberek[index].kor = parseInt(ujkor);
        await iras (emberek);
        res.json("ok")
    }
    catch (error){
        res.status(500).json(error);
    }

})

app.listen(3000,() => {
    console.log("http://localhost:3000/mindenki");
});