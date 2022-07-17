import joi from 'joi';

const idCredentialsSchema = joi.object({
  id: joi.number().min(1).required(),
});

export default idCredentialsSchema;