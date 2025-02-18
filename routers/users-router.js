import { Router } from "express";
import database from "../database.js";
import modelConfig from "../models/users-model.js";
import Model from "../models/Model.js";
import schema from "../validator/users-schema.js";
import Accessor from "../accessor/accessor.js";
import Controller from "../controller/Controller.js";
import Validator from "../validator/Validator.js";

// Validator ---------------------------
const validator = new Validator(schema);

// Model -----------------------
const model = new Model(modelConfig);

// Data Accessor ---------------
const accessor = new Accessor(model, database);

// Controllers -----------------
const controller = new Controller(validator, accessor);

// Endpoints -------------------
const router = new Router();

// Get all users irrespective of their userRoles
router.get("/", (req, res) => controller.get(req, res, null));

// Get users based on UserID
router.get("/:id", (req, res) => controller.get(req, res, null));

router.get("/userRole/:id", (req, res) => controller.get(req, res, "userRole"));

export default router;
