import express from 'express'
import kolcsonzesRoutes from './routes/kolcsonzesek.js'
const app = express();
app.use(express.json());


app.use("/kolcsonzesek",kolcsonzesRoutes)

app.get("/",(req,res)=>{
    res.send("konyvek ezutal sqlben")
})



app.listen(3000,()=> {
    console.log("http://localhost:3000")
})