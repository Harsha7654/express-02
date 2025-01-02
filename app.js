// Imports -----------------------
import express from "express";
import cors from "cors";
import database from "./database.js";

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

// Controllers ------------------------

const read = async (selectSql) => {
  try {
    const [result] = await database.query(selectSql);
    return result.length === 0
      ? { isSuccess: false, result: null, message: "No record(s) found" }
      : {
          isSuccess: true,
          result: result,
          message: "Record(s) successfully recovered",
        };
  } catch (error) {
    return {
      isSuccess: false,
      result: null,
      message: `Failed to execute query: ${error.message}`,
    };
  }
};

const buildStudentsSelectSql = (id) => {
  let sql = "";

  const table = "students";
  const fields = ["student_id", "username", "password", "email", "grade_level"];

  if (id) {
    sql = `SELECT ${fields} FROM ${table} WHERE student_id=${id}`;
  } else {
    sql = `SELECT ${fields} FROM ${table}`;
  }

  return sql;
};

const buildSubjectsSelectSql = (id) => {
  let sql = "";
  const table = "subjects";
  const fields = ["subject_id", "name", "level", "difficulty", "image"];

  if (id) {
    sql = `SELECT ${fields} FROM ${table} WHERE subject_id=${id}`;
  } else {
    sql = `SELECT ${fields} FROM ${table}`;
  }

  return sql;
};

const getStudentsController = async (req, res) => {
  const id = req.params.id; // Undefined in the case of the /api/students endpoint

  // Access data
  const sql = buildStudentsSelectSql(id);
  const { isSuccess, result, message } = await read(sql);
  if (!isSuccess) return res.status(404).json({ message });

  // Responses
  res.status(200).json(result);
};

const getSubjectsController = async (req, res) => {
  const id = req.params.id; // Undefined in the case of the /api/students endpoint

  // Access data
  const sql = buildSubjectsSelectSql(id);
  const { isSuccess, result, message } = await read(sql);
  if (!isSuccess) return res.status(404).json({ message });

  // Responses
  res.status(200).json(result);
};

// Endpoints -------------------------
app.get("/hello", (req, res) => res.send("Hi My name is Harshith"));

app.get("/api/subjects", async (req, res) => getSubjectsController(req, res));
app.get("/api/subjects/:id", async (req, res) =>
  getSubjectsController(req, res)
);
// Endpoint for retrieving all students
app.get("/api/students", async (req, res) => getStudentsController(req, res));

// Endpoint for retrieving a student by ID
app.get("/api/students/:id", async (req, res) =>
  getStudentsController(req, res)
);

// Start server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
