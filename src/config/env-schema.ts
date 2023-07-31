import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string(),
  API_KEY: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
});
