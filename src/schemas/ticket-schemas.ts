import Joi from 'joi';

export const ticketTypeIdValidationSchema = Joi.object({
  ticketTypeId: Joi.number().integer().required(),
});
