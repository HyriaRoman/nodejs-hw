import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';

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
      .valid('', ...TAGS)
      .messages({
        'any.only': `\`tag\` must be either empty or one of: ${TAGS.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),

    search: Joi.string().default('').messages({
      'string.base': '`search` must be a string',
    }),
  }),
};
