const model = {};

model.table = "teachers";
model.mutableFields = ["username", "password", "email", "qualification"];
model.idField = "teacher_id";

model.buildReadQuery = (id, variant) => {
  let table = "teachers";
  let fields = ["teacher_id", "username", "password", "email", "qualification"];
  let sql = "";

  switch (variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE teacher_id=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
