import express  from "express";
import "dotenv/config"
import { quests, nextId, incrementId } from "./database/listQuests.js";

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
  const { title, description, status } = req.body;
  // créer une nouvelle quetes
  // const newQuest = {
  //   id: id,
  //   title: title,
  //   description: description,
  //   status: status
  // }
  const newQuest = { id:nextId, title, description, status}
  quests.push(newQuest);
  // appeler la fonction pour incrémenter l id
  incrementId()
  res.json({message: "Ajout des quêtes", quests})
})

app.put("/quests/:id", (req, res) => {
  //aller chercher l id dans l url
  const questId = Number(req.params.id)
  // aller chercher le body
  const { title, description, status } = req.body;
  // trouver la quete
  const questModif = quests.find((q) => q.id === questId)
  //verifier si elle existe
  if(!questModif){
    return res.status(404).json({message:"erreur quete non trouver"})
  }
  questModif.title = title;
  questModif.description = description;
  questModif.status = status;
  res.json({message: "Modification des quêtes", questModif})
})

app.delete("/quests/:id", (req, res) => {
  // il faut aller chercher l'id du params
  const questId = Number(req.params.id);
  
  
  // trouver la quete a supprimer
  const questDelete = quests.find((q) => q.id === questId)
  // on vérifie qu'elle existe
  if(!questDelete){
    return res.status(404).json({message:"erreur quete non trouver"})
  }
  // on la supprime et on garde toutes les autres
  const quest = quests.findIndex((q) => q.id === questId)
  //  return res.json({
  //   DEBUG: {
  //     questIdRecu: questId,
  //     typeQuestId: typeof questId,
  //     questTrouve: quest,
  //     questeTrouvee: questDelete,
  //     tousLesIds: quests.map(q => ({ id: q.id, type: typeof q.id }))
  //   }
  // });
  quests.splice(quest, 1)
  
  res.json({message: "Suppressions des quêtes", questDelete})
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`🚀 Server running at http://localhost:${port}`)
})