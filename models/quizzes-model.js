const model = {};

model.table = "quizzes";
model.mutableFields = [
  "chapter_id",
  "quizTitle",
  "quizDuration",
  "quizLevel",
  "quizQuestions",
  "quizBrief",
];
model.idField = "quiz_id";

model.buildReadQuery = (id, variant) => {
  let resolvedTable = "quizzes";
  let resolvedFields = [
    "quiz_id",
    "chapter_id",
    "quizTitle",
    "quizDuration",
    "quizLevel",
    "quizQuestions",
    "quizBrief",
  ];
  let sql = "";

  switch (variant) {
    case "chapter":
      sql += `SELECT ${resolvedFields} FROM ${resolvedTable} WHERE chapter_id = :ID`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) {
        sql += ` WHERE quiz_id = :ID`;
      }
  }

  return { sql, data: { ID: id } };
};

export default model;
