import { types } from "joi";
import sequelize  from "../config/database.js";
import { DataTypes } from "sequelize";

// je crée la table Quests avec les colonnes id, title, description, status

const Quests = sequelize.define('Quests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
})