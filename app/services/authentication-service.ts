import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { AuthenticationRequest } from '../viewmodels/requests';
import { AuthenticationResponse } from '../viewmodels/response';
import { Constant, env } from '../helpers';
import { ErrorModel, ResponseViewModel } from '../viewmodels/response-viewmodel';
import { User } from '../../database/models';
import { getRepository } from 'typeorm';
import { injectable } from 'inversify';

export interface AuthenticationServiceContract {
    login(authenticationRequest: AuthenticationRequest): Promise<ResponseViewModel<AuthenticationResponse>>;
}
@injectable()
export class AuthenticationService implements AuthenticationServiceContract {
    public async login(
        authenticationRequest: AuthenticationRequest,
    ): Promise<ResponseViewModel<AuthenticationResponse>> {
        const response = new ResponseViewModel<AuthenticationResponse>();

        const user = await getRepository(User)
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('LOWER(`email`) = :email', { email: authenticationRequest.email.toLowerCase() })
            .getOne();

        if (user && bcrypt.compareSync(authenticationRequest.password, user.password)) {
            const jwtToken = jsonwebtoken.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                env.JWT_SECRET,
                {
                    expiresIn: '7d', // to create token for 7 days
                },
            );
            response.data = {
                id: user.id,
                name: user.name,
                token: jwtToken,
                email: user.email,
            };

            return response;
        }
        response.errors.push(new ErrorModel(Constant.ERRORS.INCORRECT_LOGIN_DETAIL));

        return response;
    }
}
