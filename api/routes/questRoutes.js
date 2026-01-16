import express from "express";
// import { quests, nextId, incrementId } from "../database/listQuests.js";
import { Quests } from "../models/Quests.js";

export const questsRouter = express.Router();

// modification des routes juste mis "/ car "/quests" est dans mainRoutes
questsRouter.get("/", async (req, res) => {
  // ne pas oublier le try catch a chaque fois
  try {
    // récuperer toutes les quetes avec findAll()
    const questsAll = await Quests.findAll();
    res.status(201).json({ messages: `Listes des quêtes`, questsAll });
  } catch (error) {
    res.status(500).json({ message: "Erreur quête non trouvée" });
  }
});

questsRouter.post("/", async (req, res) => {
  try {
    // aller chercher dans le body
    const { title, description, status } = req.body;
    // créer une nouvelle quetes
    // const newQuest = {
    //   id: id,
    //   title: title,
    //   description: description,
    //   status: status
    // }
    const newQuest = { title, description, status };
    // créer une quest
    const questCreate = await Quests.create(newQuest);
    // quests.push(newQuest);
    // appeler la fonction pour incrémenter l id
    // incrementId()
    res.json({ message: "Ajout des quêtes", questCreate });
    
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de quête" });
  }
});

questsRouter.put("/:id", async (req, res) => {
  try {
    //aller chercher l id dans l url
    const questId = req.params.id;
    // aller chercher le body
    const { title, description, status } = req.body;
    // trouver la quete
    const questModif = await Quests.findByPk(questId);
    //verifier si elle existe
    if (!questModif) {
      return res.status(404).json({ message: "erreur quete non trouver" });
    }
    // pour modifier on vas chercher la variable questModif
    await questModif.update({
      title,
      description,
      status
    })
    res.status(200).json({ message: "Modification des quêtes", questModif });
    
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification de quête" });
  }
});

questsRouter.delete("/:id", async(req, res) => {
  try {
    // il faut aller chercher l'id du params
    const questId = req.params.id;
    // trouver la quete a supprimer grace a son ID dans le params
    const questDelete = await Quests.findByPk(questId);
    // on vérifie qu'elle existe
    if (!questDelete) {
      return res.status(404).json({ message: "erreur quete non trouver" });
    }
    //on la supprime
    await questDelete.destroy()
    // on affiche les autres quetes pas obligatoire
    const quest = await Quests.findAll()
    // on la supprime et on garde toutes les autres
    // const quest = quests.findIndex();
    //  return res.json({
    //   DEBUG: {
    //     questIdRecu: questId,
    //     typeQuestId: typeof questId,
    //     questTrouve: quest,
    //     questeTrouvee: questDelete,
    //     tousLesIds: quests.map(q => ({ id: q.id, type: typeof q.id }))
    //   }
    // });
    // quests.splice(quest, 1);
  
    res.json({ message: "Suppressions des quêtes", questDelete, quest });
    
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de quête" });
  }
});
