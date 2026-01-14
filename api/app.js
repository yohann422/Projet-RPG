import express  from "express";
import "dotenv/config"

const app = express();

app.get("/", (req, res) =>{
  res.json({message:"page d'acceuil projet"})
})

app.get("/quests", (req, res) =>{
  res.json({messages: "Listes des quêtes"})
})

app.post("/quests", (req, res) => {
  res.json({message: "Ajout des quêtes"})
})

app.put("/quests", (req, res) => {
  res.json({message: "Modification des quêtes"})
})

app.delete("/quests", (req, res) => {
  res.json({message: "Suppressions des quêtes"})
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`🚀 Server running at http://localhost:${port}`)
})