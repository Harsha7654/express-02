// Imports -----------------------
import express from "express";
import cors from "cors";
import subjectsrouter from "./routers/subjects-router.js";

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
/*
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
*/

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
/*
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
*/

const buildTeachersSelectSql = (id) => {
  let sql = "";

  const table = "teachers";
  const fields = [
    "teacher_id",
    "username",
    "password",
    "email",
    "qualification",
  ];

  if (id) {
    sql = `SELECT ${fields} FROM ${table} WHERE teacher_id=${id}`;
  } else {
    sql = `SELECT ${fields} FROM ${table}`;
  }

  return sql;
};

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

const buildChaptersSelectSql = (subjectId, chapterId) => {
  let sql = "SELECT * FROM chapters";

  if (subjectId && chapterId) {
    sql += ` WHERE subject_id = ${subjectId} AND chapter_id = ${chapterId}`;
  } else if (subjectId) {
    sql += ` WHERE subject_id = ${subjectId}`;
  } else {
    sql;
  }

  return sql;
};

const buildQuizzesSelectSql = (chapterId, quizId) => {
  let sql = "SELECT * FROM quizzes";

  if (chapterId && quizId) {
    sql += ` WHERE chapter_id = ${chapterId} AND quiz_id = ${quizId}`;
  } else if (chapterId) {
    sql += ` WHERE chapter_id = ${chapterId}`;
  } else {
    sql;
  }

  return sql;
};

const getQuizzesController = async (req, res) => {
  const { chapterId, quizId } = req.params;

  // Generate SQL based on input
  const sql = buildQuizzesSelectSql(chapterId, quizId);

  try {
    const { isSuccess, result, message } = await read(sql);
    if (!isSuccess || result.length === 0) {
      return res.status(404).json({ message: "No quizzes found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching quizzes: ${error.message}` });
  }
};

const getChaptersController = async (req, res) => {
  const { subjectId, chapterId } = req.params;

  // Generate SQL based on input
  const sql = buildChaptersSelectSql(subjectId, chapterId);

  try {
    const { isSuccess, result, message } = await read(sql);
    if (!isSuccess || result.length === 0) {
      return res.status(404).json({ message: "No chapters found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching chapters: ${error.message}` });
  }
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

const getTeachersController = async (req, res) => {
  const id = req.params.id; // Undefined in the case of the /api/teachers endpoint

  // Access data
  const sql = buildTeachersSelectSql(id);
  const { isSuccess, result, message } = await read(sql);
  if (!isSuccess) return res.status(404).json({ message });

  // Responses
  res.status(200).json(result);
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
/*
const getSubjectsController = async (req, res) => {
  const id = req.params.id; // Undefined in the case of the /api/students endpoint

  // Access data
  const sql = buildSubjectsSelectSql(id);
  const { isSuccess, result, message } = await read(sql);
  if (!isSuccess) return res.status(404).json({ message });

  // Responses
  res.status(200).json(result);
};
*/

// Endpoints -------------------------
app.get("/hello", (req, res) => res.send("Hi My name is Harshith"));
/*
app.get("/api/subjects", async (req, res) => getSubjectsController(req, res));
app.get("/api/subjects/:id", async (req, res) =>
  getSubjectsController(req, res)
);
*/

app.use("/api/subjects", subjectsrouter);

// Endpoint for retrieving all students
app.get("/api/students", async (req, res) => getStudentsController(req, res));

// Endpoint for retrieving a student by ID
app.get("/api/students/:id", async (req, res) =>
  getStudentsController(req, res)
);

// Endpoint for retrieving all teachers
app.get("/api/teachers", async (req, res) => getTeachersController(req, res));

// Endpoint for retrieving a teacher by ID
app.get("/api/teachers/:id", async (req, res) =>
  getTeachersController(req, res)
);

// Endpoint for retrieving all admin
app.get("/api/admin", async (req, res) => getAdminsController(req, res));

// Endpoint for retrieving a admin by ID
app.get("/api/admin/:id", async (req, res) => getAdminsController(req, res));

// Get all chapters for a specific subject
app.get("/api/subjects/:subjectId/chapters", async (req, res) => {
  getChaptersController(req, res);
});

// Get a specific chapter for a specific subject
app.get("/api/subjects/:subjectId/chapters/:chapterId", async (req, res) => {
  getChaptersController(req, res);
});
// Get all chapters irrespective of their subject
app.get("/api/chapters", async (req, res) => {
  getChaptersController(req, res);
});

// Get all quizzes for a specific chapter
app.get("/api/chapters/:chapterId/quizzes", async (req, res) => {
  getQuizzesController(req, res);
});

// Get a specific quiz for a specific chapter
app.get("/api/chapters/:chapterId/quizzes/:quizId", async (req, res) => {
  getQuizzesController(req, res);
});

//Get all quizzes irrespective of their chapter
app.get("/api/chapters/quizzes", async (req, res) => {
  getQuizzesController(req, res);
});
// Start server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
