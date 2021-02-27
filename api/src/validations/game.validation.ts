import Joi from '@hapi/joi';

export const addGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    platform: Joi.string().required(),
    genre: Joi.string().required(),
    completed: Joi.boolean(),
    platinum: Joi.boolean(),
    now_playing: Joi.boolean(),
    release_date: Joi.date(),
  });

  return schema.validate(data);
}