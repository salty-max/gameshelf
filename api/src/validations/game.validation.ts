import Joi from '@hapi/joi';

export const addGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    platform: Joi.string().required(),
    genre: Joi.string().required(),
    owner: Joi.string().required(),
    releaseDate: Joi.date(),
  });

  return schema.validate(data);
}