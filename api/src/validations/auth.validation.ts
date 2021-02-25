import Joi from '@hapi/joi';

export const registerValidation = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
}