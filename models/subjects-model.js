const model = {};

model.table = "subjects";
model.mutableFields = ["name", "level", "difficulty", "image"];
model.idField = "subject_id";

model.buildReadQuery = (id, variant) => {
  let table = "subjects";
  let fields = ["subject_id", "name", "level", "difficulty", "image"];
  let sql = "";

  switch (variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE subject_id=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
