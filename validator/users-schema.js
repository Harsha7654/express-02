import joi from "joi";

const schema = {};

schema.mutablefields = [
  "UserUsername",
  "UserPassword",
  "UserEmail",
  "UserRoleID",
];

schema.recordSchema = joi
  .object({
    UserID: joi.number().integer(),
    UserUsername: joi.string().max(100),
    UserPassword: joi.string().max(255),
    UserEmail: joi.string().email().max(255),
    UserRoleID: joi.number().integer(),
  })
  .required()
  .unknown(true);

export default schema;
