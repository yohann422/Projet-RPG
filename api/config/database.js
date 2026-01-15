// pas besoin avec sequelize
// import { Client } from "pg";
// import "dotenv/config"

// const client = new Client(process.env.DB_URL);

// client.connect((error) =>{
//   if(error){
//     console.error("Une erreur a lieu a la connexion de la BDD: ", error.message)
//   } else {
//     console.log("connection a la BDD");
    
//   }
// });

// export default client;

import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_URL,
  {
    logging: false, // ne pas afficher les requetes sql en console
    define: {
      timestamps: true, // ajouter les champs timestamps (par défaut à true)
      underscored: true, // les noms de champs seront en snake_case
      createdAt: "created_at", // mapper les champs timestamps
      updatedAt: "updated_at"
    }
  }
);

// Test de connexion
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à PostgreSQL établie avec succès');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
    throw error;
  }
};
