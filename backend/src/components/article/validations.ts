import Joi from 'joi';
import { validateId } from '@utils/validator';

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

export const updateArticleRules = Joi.object({
    id: Joi.string().custom(validateId, 'Invalid ID').required(),
    title,
    description,
    body,
    tags,
});

export const idArticleRules = Joi.object({ id: Joi.string().custom(validateId, 'Invalid ID').required() });
