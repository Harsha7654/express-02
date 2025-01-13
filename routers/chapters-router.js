import { Router } from "express";
import database from "../database.js";
import modelConfig from "../models/chapters-model.js";
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

// Get all chapters irrespective of their subject
router.get("/", (req, res) => controller.get(req, res, null));

// Get chapter by chapter ID
router.get("/:id", (req, res) => controller.get(req, res, null));

// Get all chapters for a specific subject
router.get("/subject/:id", (req, res) => controller.get(req, res, "subject"));

router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

export default router;
