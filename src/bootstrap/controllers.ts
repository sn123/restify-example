import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-restify-utils';
import { UserController, CampaignController } from '../app/controllers';

export class Controllers {
    public static bootstrap(container: Container): void {
        // TODO: use Symbol.For in config
        container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(UserController)
            .whenTargetNamed('UserController');
        container
            .bind<interfaces.Controller>(TYPE.Controller)
            .to(CampaignController)
            .whenTargetNamed('CampaignController');
    }
}
