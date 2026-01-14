import express, { Router } from "express"
import { questsRouter } from "./questRoutes.js"


export const mainRoutes = express.Router()
// pour toutes les routes quests
mainRoutes.use("/quests",questsRouter)