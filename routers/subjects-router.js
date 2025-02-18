import { Router } from "express";
import Model from "../models/Model.js";
import schema from "../validator/subjects-schema.js";
import modelConfig from "../models/subjects-model.js";
import database from "../database.js";
import Accessor from "../accessor/accessor.js";
import Controller from "../controller/Controller.js";
import Validator from "../validator/Validator.js";

// Validator ---------------------------
const validator = new Validator(schema);

// Model -------------------------------
const model = new Model(modelConfig);

// Data Accessor -----------------------
const accessor = new Accessor(model, database);

// Controllers --------------------------
const controller = new Controller(validator, accessor);

// Endpoints -----------------------------
const router = new Router();

router.get("/", (req, res) => controller.get(req, res, null));
router.get("/:id", (req, res) => controller.get(req, res, null));
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

export default router;
