// Imports -----------------------
import express from "express";
import cors from "cors";
import subjectsrouter from "./routers/subjects-router.js";
import chaptersrouter from "./routers/chapters-router.js";
import quizzesrouter from "./routers/quizzes-router.js";
import studentsrouter from "./routers/students-router.js";
import teachersrouter from "./routers/teachers-router.js";

// Configure express app --------------
const app = new express();

// Configure middleware ---------------
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buildAdminsSelectSql = (id) => {
  let sql = "";
  const table = "admin";
  const fields = ["admin_id", "username", "password", "email"];

  if (id) {
    sql = `SELECT ${fields} FROM ${table} WHERE admin_id=${id}`;
  } else {
    sql = `SELECT ${fields} FROM ${table}`;
  }

  return sql;
};

const getAdminsController = async (req, res) => {
  const id = req.params.id; // Undefined in the case of the /api/teachers endpoint

  // Access data
  const sql = buildAdminsSelectSql(id);
  const { isSuccess, result, message } = await read(sql);
  if (!isSuccess) return res.status(404).json({ message });

  // Responses
  res.status(200).json(result);
};

// Endpoints -------------------------
app.get("/hello", (req, res) => res.send("Hi My name is Harshith"));

app.use("/api/subjects", subjectsrouter);

app.use("/api/students", studentsrouter);

app.use("/api/teachers", teachersrouter);
// Endpoint for retrieving all admin
app.get("/api/admin", async (req, res) => getAdminsController(req, res));

// Endpoint for retrieving a admin by ID
app.get("/api/admin/:id", async (req, res) => getAdminsController(req, res));

app.use("/api/chapters", chaptersrouter);

app.use("/api/quizzes", quizzesrouter);

// Start server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
