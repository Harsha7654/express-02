import joi from "joi";

const schema = {};

schema.mutablefields = [
  "chapter_id",
  "quizTitle",
  "quizDuration",
  "quizLevel",
  "quizQuestions",
  "quizBrief",
];

schema.recordSchema = joi
  .object({
    quiz_id: joi.number().integer(), // Primary Key (Auto Increment)
    chapter_id: joi.number().integer(), // Foreign Key (Not NULL)
    quizTitle: joi.string().max(255), // Quiz Title (Not NULL, max length 255)
    quizDuration: joi.number().integer().allow(null), // Optional duration (can be NULL)
    quizLevel: joi.string().valid("easy", "medium", "hard").allow(null), // Enum (easy, medium, hard)
    quizQuestions: joi.number().integer().allow(null), // Optional number of questions (can be NULL)
    quizBrief: joi.string().allow(null), // Optional text field
  })
  .required()
  .unknown(true);

export default schema;
