import { Container } from 'inversify';
import { UserService } from '../app/services';

export class Services {
    public static bootstrap(container: Container): void {
        container.bind<UserService>('UserService').to(UserService);
    }
}
