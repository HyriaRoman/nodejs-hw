import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.email': '`email` must be a valid email address',
    }),

    password: Joi.string().required().min(8).messages({
      'any.required': '`password` is required',
      'string.base': '`password` must be a string',
      'string.min': '`password` should have at least {#limit} characters',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.email': '`email` must be a valid email address',
    }),

    password: Joi.string().required().messages({
      'any.required': '`password` is required',
      'string.base': '`password` must be a string',
      'string.min': '`password` should have at least {#limit} characters',
    }),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.email': '`email` must be a valid email address',
    }),
  }),
};
