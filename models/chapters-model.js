const model = {};

model.table = "chapters";
model.mutableFields = [
  "subject_id",
  "chapterName",
  "chapterAuthor",
  "chapterBrief",
  "chapterImage",
];
model.idField = "chapter_id";

model.buildReadQuery = (id, variant) => {
  let resolvedTable = "chapters";
  let resolvedFields = [
    "chapter_id",
    "subject_id",
    "chapterName",
    "chapterAuthor",
    "chapterBrief",
    "chapterImage",
  ];
  let sql = "";

  switch (variant) {
    case "subject":
      sql += `SELECT ${resolvedFields} FROM ${resolvedTable} WHERE subject_id = :ID`;
      break;
    case "chapter":
      sql += ` WHERE subject_id = ${subjectId} AND chapter_id = ${chapterId}`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) {
        sql += ` WHERE chapter_id = :ID`;
      }
  }

  return { sql, data: { ID: id } };
};

export default model;
