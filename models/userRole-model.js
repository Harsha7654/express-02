const model = {};

model.table = "UserRole";
model.mutableFields = ["UserRoleType"];
model.idField = "UserRoleID";

model.buildReadQuery = (id, variant) => {
  let table = "UserRole";
  let fields = ["UserRoleID", "UserRoleType"];
  let sql = "";

  switch (variant) {
    default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE UserRoleID=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
