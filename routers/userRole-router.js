import { Router } from "express";
import Model from "../models/Model.js";
import schema from "../validator/userRole-schema.js";
import modelConfig from "../models/userRole-model.js";
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

// Endpoint to retrieve all userRoles
router.get("/", (req, res) => controller.get(req, res, null));

// Endpoint to retrieving userRole by ID
router.get("/:id", (req, res) => controller.get(req, res, null));

export default router;
