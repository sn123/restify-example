import * as Yup from 'yup';
import { ErrorModel, ResponseViewModel } from '../viewmodels/response-viewmodel';
import { injectable } from 'inversify';
import { Request } from 'restify';

@injectable()
export class ControllerBase {
    protected validate<T>(request: Request, validator: Yup.ObjectSchema): Promise<ResponseViewModel<T | null> | null> {
        return new Promise(
            async (resolve): Promise<Promise<ResponseViewModel<T | null>> | void> => {
                const body = request.body || {};
                const errorResponse = new ResponseViewModel<T | null>();
                errorResponse.data = null;
                try {
                    await validator.validate(body, { abortEarly: false });
                    resolve(null);
                    return;
                } catch (validationErrors) {
                    validationErrors.inner.forEach((validationError: Yup.ValidationError): void => {
                        errorResponse.errors.push(new ErrorModel(validationError.message, validationError.path));
                    });
                }
                resolve(errorResponse);
            },
        );
    }

    protected AuthTransform<T>(request: Request, TCreator: { new (): T }): T {
        const requestModel = new TCreator();
        Object.assign(requestModel, request.body);

        return requestModel;
    }
}
