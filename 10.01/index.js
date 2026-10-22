import express from "express";
const app = express();
app.use(express.json()); // Middleware a body tartalmát JSON formátummá alakítja

import fs from "fs/promises";

const emberek = async () => {
  try {
    const response = await fs.readFile("emberek.json", "utf-8");
    return JSON.parse(response);
  } catch (error) {
    console.error("Hiba történt a fájl olvasása közben:", error);
    return []; // Ha hiba történik, üres tömböt adunk vissza
  }
};

app.get("/", (req, res) => {
  res.send("létrehozáshoz használja a POST metódust");
});

// create
app.post("/uj", async (req, res) => {
  const { nev, nem, kor } = req.body; // az üzenet törzsében várjuk az adatokat
  if (!nev) {
    return res.status(400).send("Hiba: Nincs megadva a név mező!");
  }
  if (!nem) {
    return res.status(400).send("Hiba: Nincs megadva a nem mező!");
  }
  if (!kor) {
    return res.status(400).send("Hiba: Nincs megadva a kor mező!");
  }
  const emberekData = await emberek();
  const id = emberekData.length > 0 ? Math.max(emberekData.map(ember => ember.id)) + 1 : 1;
  console.log(`Új ember létrehozása: id=${id}, név=${nev}, nem=${nem}, kor=${kor}`);
  const ujEmber = { "id": id, "nev": nev, "nem": nem, "kor": kor };
  await fs.writeFile("emberek.json", JSON.stringify([...emberekData, ujEmber]));
  res.status(201).send(`Sikeresen létrehozva az új ember: ${JSON.stringify(ujEmber)}`);
});

// read
app.get("/mindenki", async (req, res) => {
  const emberekData = await emberek();
  res.json(emberekData);
});

app.get("/egyedi/:id", async (req, res) => {
  const id = req.params.id;
  const emberekData = await emberek();
  const ember = emberekData.find(ember => ember.id === parseInt(id));
  if (!ember) {
    return res.status(404).send("Nem található ilyen ID-jú ember.");
  }
  res.json(ember);
});

// update
app.put("/modosit/:id", (req, res) => {
  const id = req.params.id;
  res.send(`PUT metódus sikeresen meghívva az id: ${id}`);
});

// partial update
app.patch("/reszleges/:id", (req, res) => {
  const id = req.params.id;
  res.send(`PATCH metódus sikeresen meghívva az id: ${id}`);
});

// delete
app.delete("/torol/:id", (req, res) => {
  const id = req.params.id;
  res.send(`DELETE metódus sikeresen meghívva az id: ${id}`);
});

// port figyelés beállítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
