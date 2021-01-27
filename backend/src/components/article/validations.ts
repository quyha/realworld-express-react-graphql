import Joi from 'joi';

const title = Joi.string().empty().required();
const description = Joi.string().empty().required();
const body = Joi.string().empty().required();
const tags = Joi.array().items(Joi.string());

export const createArticleRules = Joi.object({
    title,
    description,
    body,
    tags,
});
