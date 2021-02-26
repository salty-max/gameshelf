import Joi from '@hapi/joi';

export const addGenreValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(data);
}