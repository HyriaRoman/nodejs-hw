import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

function objectIdValidator(value, helpers) {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
}

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': '`page` must be an integer',
      'number.integer': '`page` must be an integer',
      'number.min': '`page` must be at least {#limit}',
    }),

    perPage: Joi.number().integer().min(1).default(10).messages({
      'number.base': '`perPage` must be an integer',
      'number.integer': '`perPage` must be an integer',
      'number.min': '`perPage` must be at least {#limit}',
    }),

    tag: Joi.string()
      .default('')
      .valid(...TAGS)
      .messages({
        'any.only': `\`tag\` must be one of: ${TAGS.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),

    search: Joi.string().default('').messages({
      'string.base': '`search` must be a string',
    }),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'any.required': '`title` is required',
      'string.base': '`title` must be a string',
      'string.min': '`title` should have at least {#limit} characters',
    }),

    content: Joi.string().default('').min(1).default(10).messages({
      'string.base': '`content` must be a string',
    }),

    tag: Joi.string()
      .default('')
      .valid(...TAGS)
      .messages({
        'any.only': `\`tag\` must be one of: ${TAGS.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'any.required': '`title` is required',
      'string.base': '`title` must be a string',
      'string.min': '`title` should have at least {#limit} characters',
    }),

    content: Joi.string().default('').min(1).default(10).messages({
      'string.base': '`content` must be a string',
    }),

    tag: Joi.string()
      .default('')
      .valid(...TAGS)
      .messages({
        'any.only': `\`tag\` must be one of: ${TAGS.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),
  })
    .min(1)
    .messages({
      'object.min':
        'At least one of `title`, `content` or `tag` must be present',
    }),
};
