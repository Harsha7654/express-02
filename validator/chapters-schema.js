import joi from "joi";

const schema = {};

schema.mutablefields = [
  "subject_id",
  "chapterName",
  "chapterAuthor",
  "chapterBrief",
  "chapterImage",
];

schema.recordSchema = joi
  .object({
    chapter_id: joi.number().integer(), // Primary Key (Auto Increment)
    subject_id: joi.number().integer(), // Foreign Key (Not NULL)
    chapterName: joi.string().max(255), // Chapter Name (Not NULL)
    chapterAuthor: joi.string().max(255).allow(null), // Optional Author Name
    chapterBrief: joi.string().allow(null), // Optional Text Field
    chapterImage: joi.string().max(255).allow(null), // Optional Image URL
  })
  .required()
  .unknown(true);

export default schema;
