import joi from "joi";

const schema = {};

schema.mutablefields = ["name", "level", "difficulty", "image"];

schema.recordSchema = joi
  .object({
    subject_id: joi.number().integer(),
    name: joi.string().max(255).required(),
    level: joi.number().integer().allow(null),
    difficulty: joi.string().max(50).allow(null),
    image: joi.string().max(255).allow(null),
  })
  .required()
  .unknown(true);

export default schema;
