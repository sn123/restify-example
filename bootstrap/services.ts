import { Container } from 'inversify';
import {
    AuthenticationService,
    AuthenticationServiceContract,
    UserService,
    UserServiceContract,
} from '../app/services';

export class Services {
    public static bootstrap(container: Container): void {
        container.bind<AuthenticationServiceContract>('AuthenticationService').to(AuthenticationService);
        container.bind<UserServiceContract>('UserService').to(UserService);
    }
}
