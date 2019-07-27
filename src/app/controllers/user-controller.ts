import { Request } from 'restify';
import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { inject, injectable } from 'inversify';
import { UserService } from '../services/user-service';

@Controller('/user')
@injectable()
export class UserController implements interfaces.Controller {
    public constructor(@inject('UserService') private userService: UserService) {}

    @Get('/:id')
    public index(req: Request): string {
        return this.userService.helloWorld(req.params.id);
    }
}
