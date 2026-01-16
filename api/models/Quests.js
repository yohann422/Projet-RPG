import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

// je crée la table Quests avec les colonnes id, title, description, status

export const Quests = sequelize.define('Quests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type:DataTypes.STRING,
    allowNull: false
  },
  description: {
    type:DataTypes.TEXT,
  },
  status: {
    type:DataTypes.STRING,
    defaultValue: "A faire"
  }
})