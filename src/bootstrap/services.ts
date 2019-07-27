import { Container } from 'inversify';
import { UserService, UserServiceContract } from '../app/services';

export class Services {
    public static bootstrap(container: Container): void {
        container.bind<UserServiceContract>('UserService').to(UserService);
    }
}
