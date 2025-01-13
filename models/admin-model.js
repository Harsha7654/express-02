const model = {};

model.table = "admin";
model.mutableFields = ["username", "password", "email"];
model.idField = "admin_id";

model.buildReadQuery = (id, variant) => {
  let table = "admin";
  let fields = ["admin_id", "username", "password", "email"];
  let sql = "";

  switch (variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE admin_id=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
