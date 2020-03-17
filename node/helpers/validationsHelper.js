const Joi = require('@hapi/joi');
const { options } = require('../config/config');
const Promise = require('bluebird');

const optionsParams = {
  nameRegex: /^(([a-zA-Z])+([-\ \.])?([a-zA-Z])+)+$/,
  passwordRegex: /^(?=.*[0-9])(?=.*[a-z]).{6,}$/
};

const registerUser = body => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    username: Joi.string()
      .regex(optionsParams.nameRegex)
      .min(3)
      .required(),
    password: Joi.string()
      .regex(optionsParams.passwordRegex)
      .min(6)
      .required(),
    passwordConfirm: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict()
  });

  return new Promise((resolve, reject) => {
    const { error } = schema.validate(body, options);
    if (error) reject(error);
    resolve(true);
  });
};

const loginUser = body => {
  const schema = Joi.object({
    username: Joi.string()
      .regex(optionsParams.nameRegex)
      .min(3)
      .required(),
    password: Joi.string()
      .regex(optionsParams.passwordRegex)
      .min(6)
      .required()
  });

  return new Promise((resolve, reject) => {
    const { error } = schema.validate(body, options);
    if (error) reject(error);
    resolve(true);
  });
};

const editUser = body => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    username: Joi.string()
      .regex(optionsParams.nameRegex)
      .min(3)
  });

  return new Promise((resolve, reject) => {
    const { error } = schema.validate(body, options);
    if (error) reject(error);
    resolve(true);
  });
};

const editPassword = body => {
  const schema = Joi.object({
    oldPassword: Joi.string()
      .regex(optionsParams.passwordRegex)
      .min(6)
      .required(),
    newPassword: Joi.string()
      .regex(optionsParams.passwordRegex)
      .min(6)
      .required(),
    newPasswordConfirm: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .strict()
  });

  return new Promise((resolve, reject) => {
    const { error } = schema.validate(body, options);
    if (error) reject(error);
    resolve(true);
  });
};

module.exports = { registerUser, loginUser, editUser, editPassword };
