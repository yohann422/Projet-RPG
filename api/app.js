import express  from "express";
import "dotenv/config"
import {mainRoutes} from "./routes/mainRoutes.js"
import { sequelize, testConnection } from "./config/database.js"

const app = express();

// Ajout du middleware intégré à Express pour parser les requêtes JSON
// Il permet d'accéder aux données envoyées dans req.body
app.use(express.json()),

// on appel mainRoutes qui se trouve dans le dossier routes
app.use(mainRoutes)


const startServer = async ()=>{
  try {
    await testConnection()
    
    const port = process.env.PORT || 3000;
    app.listen(port, () =>{
      console.log(`🚀 Server running at http://localhost:${port}`)
    });
    
  } catch (error) {
    console.error('❌ Erreur au démarrage:', error);
    process.exit(1);
  }
};

startServer();

