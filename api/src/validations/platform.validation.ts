import Joi from '@hapi/joi';

export const addPlatformValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(data);
}