import express  from "express";
import "dotenv/config"
import { quests } from "./database/listQuests.js";

const app = express();

// Ajout du middleware intégré à Express pour parser les requêtes JSON
// Il permet d'accéder aux données envoyées dans req.body
app.use(express.json()),


app.get("/", (req, res) =>{
  res.json({message:"page d'acceuil projet"})
})

app.get("/quests", (req, res) =>{
  res.json({messages: `Listes des quêtes`, 
    quests})
})

app.post("/quests", (req, res) => {
  // aller chercher dans le body
  const { id, title, description, status } = req.body;
  // créer une nouvelle quetes
  const newQuest = {
    id: id,
    title: title,
    description: description,
    status: status
  }
  quests.push(newQuest)
  res.json({message: "Ajout des quêtes", quests})
})

app.put("/quests/:id", (req, res) => {
  res.json({message: "Modification des quêtes"})
})

app.delete("/quests/:id", (req, res) => {
  res.json({message: "Suppressions des quêtes"})
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`🚀 Server running at http://localhost:${port}`)
})