const model = {};

model.table = "students";
model.mutableFields = ["username", "password", "email", "grade_level"];
model.idField = "student_id";

model.buildReadQuery = (id, variant) => {
  let table = "students";
  let fields = ["student_id", "username", "password", "email", "grade_level"];
  let sql = "";

  switch (variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE student_id=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
