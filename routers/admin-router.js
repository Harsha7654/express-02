import { Router } from "express";
import Model from "../models/Model.js";
import modelConfig from "../models/admin-model.js";
import database from "../database.js";
import Accessor from "../accessor/accessor.js";
import Controller from "../controller/Controller.js";

// Model -------------------------------
const model = new Model(modelConfig);

// Data Accessor -----------------------
const accessor = new Accessor(model, database);

// Controllers --------------------------
const controller = new Controller(accessor);

// Endpoints -----------------------------
const router = new Router();

// Endpoint for retrieving all admin
router.get("/", (req, res) => controller.get(req, res, null));

// Endpoint for retrieving a admin by ID
router.get("/:id", (req, res) => controller.get(req, res, null));

export default router;
