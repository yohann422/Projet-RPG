import express  from "express";
import "dotenv/config"
import {mainRoutes} from "./routes/mainRoutes.js"

const app = express();

// Ajout du middleware intégré à Express pour parser les requêtes JSON
// Il permet d'accéder aux données envoyées dans req.body
app.use(express.json()),


app.use(mainRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`🚀 Server running at http://localhost:${port}`)
})