import { Request, Response, Next } from 'restify';
import * as Joi from '@hapi/joi';
import { ResponseViewModel } from '../viewmodels/response-viewmodel';
import { ValidationError } from '../errors/validation-error';

interface ValidationType {
    type: string;
    validator: Joi.ObjectSchema;
}

interface ValidationSpec {
    validation: ValidationType;
}

export const Validator = (req: Request, res: Response, next: Next): void => {
    // the typings file for restify don't have spec even though it is part of route
    // ignore ts warning for this
    // @ts-ignore
    let routeSpec: ValidationSpec = req.getRoute().spec;
    if (!routeSpec || !routeSpec.validation) {
        next();
        return;
    }
    //for now we'll only assume that validation is for body
    const validator = routeSpec.validation.validator;
    const validationResult = Joi.validate(req.body, validator, {
        allowUnknown: true,
        abortEarly: false,
    });
    if (!validationResult.error) {
        next();
        return;
    }
    const errorResponse = new ResponseViewModel<null>();
    errorResponse.data = null;
    errorResponse.errors = validationResult.error.details.map((e): string => e.message);
    const error = new ValidationError(errorResponse);
    error.statusCode = 200;
    next(error);
};
