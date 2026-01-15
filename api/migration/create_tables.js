// ============================================
// migrations/create-tables.js
// ============================================

import { sequelize } from "../models/index.js";

//synchroniser avec le BDD nos models
await sequelize.sync({ force: true }); //  force: true = supprimer les tables existantes puis les recréer
console.log("✅ All models were synchronized successfully");

// ferme manuellement la connexion
await sequelize.close();