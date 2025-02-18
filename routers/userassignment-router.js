import { Router } from "express";
import Model from "../models/Model.js";
import schema from "../validator/userassignment-schema.js";
import modelConfig from "../models/userassignment-model.js";
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

// Endpoint in retrieving all userSubjectAssignments
router.get("/", (req, res) => controller.get(req, res, null));

// Endpoint for retrieving all assignments based on ID
router.get("/:id", (req, res) => controller.get(req, res, null));

// Endpoint to get subjects based on user assignment with UserID
router.get("/user/:id", (req, res) => controller.get(req, res, "user"));

export default router;
