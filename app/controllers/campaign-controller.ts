import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { injectable } from 'inversify';

@Controller('/campaign')
@injectable()
export class CampaignController implements interfaces.Controller {
    @Get('/')
    public index(): string {
        throw new Error('test errors');
        return 'campaigns';
    }
}
