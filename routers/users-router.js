import { Router } from "express";
import database from "../database.js";
import modelConfig from "../models/users-model.js";
import Model from "../models/Model.js";
import Accessor from "../accessor/accessor.js";
import Controller from "../controller/Controller.js";

// Model -----------------------
const model = new Model(modelConfig);

// Data Accessor ---------------
const accessor = new Accessor(model, database);

// Controllers -----------------
const controller = new Controller(accessor);

// Endpoints -------------------
const router = new Router();

// Get all users irrespective of their userRoles
router.get("/", (req, res) => controller.get(req, res, null));

export default router;
