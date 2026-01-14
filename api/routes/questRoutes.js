import express from "express"
import { quests, nextId, incrementId } from "../database/listQuests.js"

export const questsRouter = express.Router()
// modification des routes juste mis "/ car "/quests" est dans mainRoutes
questsRouter.get("/", (req, res) =>{
  res.json({messages: `Listes des quêtes`, 
    quests})
})

questsRouter.post("/", (req, res) => {
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

questsRouter.put("/:id", (req, res) => {
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

questsRouter.delete("/:id", (req, res) => {
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