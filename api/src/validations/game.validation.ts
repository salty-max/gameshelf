import Joi from '@hapi/joi';

export const addGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    platform: Joi.string().required(),
    genres: Joi.array().required(),
    developers: Joi.array(),
    editors: Joi.array(),
    completed: Joi.boolean(),
    platinum: Joi.boolean(),
    nowPlaying: Joi.boolean(),
    physical: Joi.boolean(),
    releaseDate: Joi.date(),
    cover: Joi.string()
  });

  return schema.validate(data);
}

export const editGameValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string(),
    platform: Joi.string(),
    genres: Joi.array(),
    developers: Joi.array(),
    editors: Joi.array(),
    completed: Joi.boolean(),
    platinum: Joi.boolean(),
    nowPlaying: Joi.boolean(),
    physical: Joi.boolean(),
    releaseDate: Joi.date(),
    cover: Joi.string()
  });

  return schema.validate(data);
}