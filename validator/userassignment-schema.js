import joi from "joi";

const schema = {};

schema.mutablefields = ["UserID", "SubjectID"];

schema.recordSchema = joi
  .object({
    UserAssignmentID: joi.number().integer(), // Primary Key (Auto Increment)
    UserID: joi.number().integer(), // Foreign Key (Not NULL)
    SubjectID: joi.number().integer(), // Foreign Key (Not NULL)
  })
  .required()
  .unknown(true);

export default schema;
