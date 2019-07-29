import * as Joi from '@hapi/joi';

export const CreateUserValidator: Joi.ObjectSchema = Joi.object()
    .keys({
        email: Joi.string().required(),
        name: Joi.string()
            .max(10)
            .min(5)
            .required(),
    })
    .required();
