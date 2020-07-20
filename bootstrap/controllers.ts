import { AuthenticationController, CampaignController, UserController } from '../app/controllers';
import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-restify-utils';

export class Controllers {
    public static bootstrap(container: Container): void {
        // TODO: use Symbol.For in config
        container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(AuthenticationController)
            .whenTargetNamed('AuthenticationController');
        container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(CampaignController)
            .whenTargetNamed('CampaignController');
        container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(UserController)
            .whenTargetNamed('UserController');
    }
}
