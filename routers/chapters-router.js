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

router.get("/chapters", (req, res) => controller.get(req, res, null));
router.get("/chapters/:id", (req, res) => controller.get(req, res, null));
router.get("/chapters/subject/:id", (req, res) =>
  controller.get(req, res, "subject")
);

export default router;
