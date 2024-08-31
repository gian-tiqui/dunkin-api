import Joi from "joi";

export const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("username"),
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().min(8).max(255).label("password"),
    phone: Joi.string().optional().label("phone"),
  });

  return schema.validate(body);
};

export const loginBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email().label("email"),
    password: Joi.string().required().min(8).max(255).label("password"),
  });

  return schema.validate(body);
};

export const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("refreshToken"),
  });

  return schema.validate(body);
};
