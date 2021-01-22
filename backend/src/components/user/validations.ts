import Joi from 'joi';

const email = Joi.string().email().required().messages({
    'string.base': '"email" should be a type of \'text\'',
    'string.empty': '"email" cannot be an empty',
});
const username = Joi.string().empty().min(3).max(10).required().messages({
    'string.base': '"username" should be a type of \'text\'',
    'string.empty': '"username" cannot be an empty field',
    'string.min': '"username" should have a minimum length of {#limit}',
    'string.max': '"username" should have a maximum length of {#limit}',
    'any.required': '"username" is a required field'
});
const password = Joi.string().min(5).required();

export const userRegisterRules = Joi.object({ email, username, password });

export const userLoginRules = Joi.object({ email, password });
