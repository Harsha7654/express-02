const model = {};

model.table = "UserSubjectAssignment";
model.mutableFields = ["UserID", "SubjectID"];
model.idField = "UserAssignmentID";

model.buildReadQuery = (id, variant) => {
  let resolvedTable = "UserSubjectAssignment";
  let resolvedFields = ["UserAssignmentID", "UserID", "SubjectID"];
  let sql = "";

  switch (variant) {
    case "user":
      sql += `SELECT UserAssignmentID, UserID, SubjectID, name, level, difficulty, image FROM userSubjectAssignment JOIN subjects ON SubjectID = subject_id WHERE UserID = :ID`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE UserAssignmentID=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
