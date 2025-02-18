import joi from "joi";

const schema = {};

schema.mutablefields = ["UserRoleType"];

schema.recordSchema = joi
  .object({
    UserRoleID: joi.number().integer(), // Primary Key (Auto Increment)
    UserRoleType: joi.string().max(20), // Role Type (Not NULL, max length 20)
  })
  .required()
  .unknown(true);

export default schema;
