import { AuthenticateUserValidator } from '../validators/authenticate-user-validator';
import { AuthenticationRequest } from '../viewmodels/requests';
import { AuthenticationResponse } from '../viewmodels/response';
import { AuthenticationServiceContract } from '../services';
import { Controller, interfaces, Post } from 'inversify-restify-utils';
import { ControllerBase } from './controller-base';
import { inject, injectable } from 'inversify';
import { Request } from 'restify';
import { ResponseViewModel } from '../viewmodels/response-viewmodel';

@Controller('/authenticate')
@injectable()
export class AuthenticationController extends ControllerBase implements interfaces.Controller {
    public constructor(
        @inject('AuthenticationService') private readonly authenticationService: AuthenticationServiceContract,
    ) {
        super();
    }

    @Post('/')
    public async login(request: Request): Promise<ResponseViewModel<AuthenticationResponse | null> | null> {
        const validationResult = await super.validate<AuthenticationResponse>(request, AuthenticateUserValidator);
        if (validationResult) {
            return validationResult;
        }

        const authenticationRequest = super.AuthTransform<AuthenticationRequest>(request, AuthenticationRequest);

        return this.authenticationService.login(authenticationRequest);
    }
}
