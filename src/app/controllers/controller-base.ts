import { Request } from 'restify';
import * as Joi from '@hapi/joi';
import { ResponseViewModel } from '../viewmodels/response-viewmodel';
import { injectable } from 'inversify';

@injectable()
export class ControllerBase {
    protected validate<T>(request: Request, validator: Joi.ObjectSchema): ResponseViewModel<T | null> | null {
        const body = request.body;
        if (!body) {
            return null;
        }
        const validationResult = Joi.validate(body, validator, {
            allowUnknown: true,
            abortEarly: false,
        });
        if (validationResult.error === null) {
            return null;
        }
        const errorResponse = new ResponseViewModel<T | null>();
        errorResponse.data = null;
        errorResponse.errors = validationResult.error.details.map((e): string => e.message);
        return errorResponse;
    }
}
