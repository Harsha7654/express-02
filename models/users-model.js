const model = {};

model.table = "User";
model.mutableFields = [
  "UserUsername",
  "UserPassword",
  "UserEmail",
  "UserRoleID",
];
model.idField = "UserID";

model.buildReadQuery = (id, variant) => {
  let resolvedTable = "User";
  let resolvedFields = [
    "UserID",
    "UserUsername",
    "UserPassword",
    "UserEmail",
    "UserRoleID",
  ];
  let sql = "";

  switch (variant) {
    case "userRole":
      sql += `SELECT ${resolvedFields} FROM ${resolvedTable} WHERE UserRoleID = :ID`;
      break;
    case "students":
      sql += `SELECT ${resolvedFields} FROM ${resolvedTable} WHERE UserRoleID = :ID`;
      break;
    case "admin":
      sql += `SELECT ${resolvedFields} FROM ${resolvedTable} WHERE UserRoleID = :ID`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) {
        sql += ` WHERE UserID = :ID`;
      }
  }

  return { sql, data: { ID: id } };
};

export default model;
