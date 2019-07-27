import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-restify-utils';
import { UserController } from '../app/controllers';

export class Controllers {
    public static bootstrap(container: Container): void {
        container.bind<interfaces.Controller>(TYPE.Controller).to(UserController);
    }
}
