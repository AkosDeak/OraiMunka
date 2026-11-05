import express from 'express';
import pool from './data/db.js';

const app = express();

app.get("/", (req,res) => {
    res.status(200).send("zenetar");
});

app.get("/eloadok", async (req,res) => {
    const {orszag} = req.query;
    let sql = "";

    if(orszag === undefined){
        try{
            sql = "SELECT * FROM eloadok ORDER BY nev ASC;";
            const [eloadok] = await pool.query(sql);
            res.status(200).json(eloadok);
        }
        catch{
            return res.status(400).send("nem jó")
        }
    }

    try{
        sql = "SELECT * FROM eloadok WHERE orszag = ? ORDER BY nev ASC;"
        const [eloadok] = await pool.query(sql,[orszag]);
        res.status(200).json(eloadok);
    }
    catch{
        return res.status(400).send("nem jó")    
    }
});

app.get("/eloadok/:id", async (req,res) => {
    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).send("szám kéne")
    }

    try{
        
        let sql = "SELECT * FROM albumok WHERE eloado_id = ? ORDER BY ev ASC;";
        const [albumok] = await pool.query(sql,[id]);

        sql = "SELECT * FROM eloadok WHERE id = ?";
        const [eloado] = await pool.query(sql,[id]);

        eloado[0].albumok = albumok;
        res.status(200).json(eloado[0]);

    }
    catch{
        return res.status(404).send("probalkozz masik szammal");
    }

});

app.get("/albumok", async (req,res) => {
    const {mufaj,tol,ig} = req.query;
    let sql = "";
    if (typeof(mufaj) === undefined && typeof(tol) === undefined && typeof(ig) === undefined)
    {
        try{
            sql = "SELECT a.id,a.cim,e.nev,a.ev,a.mufaj,a.hossz FROM albumok a JOIN eloadok e ON a.eloado_id = e.id ORDER BY a.ev,a.cim ASC;"
            const [albumok] = await pool.query(sql);
            res.status(200).json(albumok);
        }
        catch{
            return res.status(400).send("nem jó")
        }
    }

    // sqlselect
    //if letezik .push
    //sql = "SELECT * FROM albumok WHERE mufaj = 'pop' AND ev BETWEEN 1980 AND 2010;"
    sql = "SELECT * FROM albumok WHERE "
    let parameter = [];
    Object.keys(req.query).length > 0

    szurok .join(' and ')

    if(mufaj !== undefined){
        parameter.push(`mufaj = "${mufaj}"`);
    };
    // if(tol !== undefined && ig !== undefined){
    //     parameter.push(`AND mufaj = '${tol}' AND BETWEEN ${tol} AND ${ig}`);
    // };
    if(mufaj !== undefined && tol !== undefined){
        parameter.push(`AND ev > ${tol}`);
    }
    else{
        parameter.push(`ev > ${tol}`);
    }

    if(tol !== undefined && ig !== undefined){
        parameter.push(`AND ev < ${ig}`);
    }
    else{
        parameter.push(`ev < ${ig}`);
    }

    sql += parameter;

    sql = sql.replaceAll(',',' ');

    console.log(sql)
    try{
        
        const [albumok] = await pool.query(sql);
        res.status(200).json(albumok);
    }
    catch{
        return res.status(400).send("nem jó")
    }


});




app.listen(3000, () => {
    console.log("http://localhost:3000");
});