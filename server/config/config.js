const Joi = require('@hapi/joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('dev', 'prod')
    .required(),
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGODB_URI: Joi.string()
    .required()
    .description('MongoDB URI')
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const dbURI = `${process.env.MONGODB_URI}-${process.env.NODE_ENV}`;

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  mongoDB: dbURI,
  options: {
    allowUnknown: true,
    abortEarly: false
  }
};

module.exports = config;
