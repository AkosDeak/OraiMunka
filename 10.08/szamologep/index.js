import express from 'express'

const app = express();

function fakt(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

function oszto(n){
    let osztok = [];
    for(let i = 1; i <= n; i++) {
    
        if(n % i == 0) {
            osztok.push(i) ;
        }
    }
    return osztok
}



app.get("/",(req,res) => {
    res.status(200).send("Matekozunk!")
});

app.get("/hatvany/:a/:b", (req,res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if(isNaN(a) || isNaN(b))
    {
        return res.status(400).send("Számmal lehet számolni!")
    }
    const hatvany = Math.pow(a,b)
    res.status(200).send(`${a} a(z) ${b}. hatványon = ${hatvany}`)
});

app.get("/paros/:a", (req,res) => {

    const a = Number(req.params.a);
    
    if(isNaN(a) || !Number.isInteger(a))
    {
        return res.status(400).send("Egész számmal lehet számolni!");
    };
    
    let paros = false;

    if(a % 2 == 0)
    {
        paros = true;
    }

    if(paros){
        res.status(200).send(`A(z) ${a} páros.`);
    }
    else{
        res.status(200).send(`A(z) ${a} páratlan.`);
    }
    
});

app.get("/nagyobb/:a/:b", (req,res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if(isNaN(a) || isNaN(b))
    {
        return res.status(400).send("Számmal lehet számolni!")
    }

    if(a > b){
        res.status(200).send(`A nagyobb szám: ${a}`)
    }
    else if(a < b){
        res.status(200).send(`A nagyobb szám: ${b}`)
    }
    else{
        res.status(200).send("A két szám egyenlő.")
    }

});

app.get("/faktorialis/:a", (req,res) => {
    const a = Number(req.params.a);
    if(isNaN(a) || a > 20 || a < 0 )
    {
        return res.status(400).send("0 és 20 közotti számmal lehet számolni!")
    }
	

    res.status(200).send(`${a}! = ${fakt(a)}`);
});

app.get("/osztok/:a", (req,res) => {
    const a = Number(req.params.a);
    if(isNaN(a) || a === 0)
    {
        return res.status(400).send("Számmal lehet számolni!")
    }
    
    res.status(200).send(String(oszto(a)));
});

app.listen(3000,() => {
    console.log("http://localhost:3000")
})