// Imports -----------------------
import express from "express";
import cors from "cors";
import subjectsrouter from "./routers/subjects-router.js";
import chaptersrouter from "./routers/chapters-router.js";
import quizzesrouter from "./routers/quizzes-router.js";
import studentsrouter from "./routers/students-router.js";
import teachersrouter from "./routers/teachers-router.js";
import adminrouter from "./routers/admin-router.js";

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

// Endpoints -------------------------
app.get("/hello", (req, res) => res.send("Hi My name is Harshith"));

app.use("/api/subjects", subjectsrouter);

app.use("/api/students", studentsrouter);

app.use("/api/teachers", teachersrouter);

app.use("/api/admin", adminrouter);

app.use("/api/chapters", chaptersrouter);

app.use("/api/quizzes", quizzesrouter);

// Start server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
