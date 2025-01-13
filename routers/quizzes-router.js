import { Router } from "express";
import database from "../database.js";
import modelConfig from "../models/quizzes-model.js";
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

//Get all quizzes irrespective of their chapter
router.get("/", (req, res) => controller.get(req, res, null));

// Get quiz by Quiz ID
router.get("/:id", (req, res) => controller.get(req, res, null));

// Get all quizzes for a specific chapter
router.get("/chapter/:id", (req, res) => controller.get(req, res, "chapter"));

router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
export default router;
