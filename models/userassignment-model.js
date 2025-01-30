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
      sql += `SELECT usa.UserAssignmentID, usa.UserID, usa.SubjectID, s.name, s.level, s.difficulty, s.image FROM userSubjectAssignment usa JOIN subjects s ON usa.SubjectID = s.subject_id WHERE usa.UserID = :ID`;
      break;
    default:
      sql = `SELECT ${resolvedFields} FROM ${resolvedTable}`;
      if (id) sql += ` WHERE UserAssignmentID=:ID`;
  }

  return { sql, data: { ID: id } };
};

export default model;
