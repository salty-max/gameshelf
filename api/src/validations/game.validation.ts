import Joi from '@hapi/joi';

export const addGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    platforms: Joi.array().required(),
    genres: Joi.array().required(),
    completed: Joi.boolean(),
    platinum: Joi.boolean(),
    now_playing: Joi.boolean(),
    release_date: Joi.date(),
    cover: Joi.string()
  });

  return schema.validate(data);
}

export const editGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string(),
    platforms: Joi.array(),
    genres: Joi.array(),
    completed: Joi.boolean(),
    platinum: Joi.boolean(),
    now_playing: Joi.boolean(),
    release_date: Joi.date(),
    cover: Joi.string()
  });

  return schema.validate(data);
}