import { Request } from 'restify';
import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { inject, injectable } from 'inversify';
import { UserService } from '../services/user-service';

@Controller('/user')
@injectable()
export class UserController implements interfaces.Controller {
    public constructor(@inject('UserService') private userService: UserService) {}

    @Get('/:id')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public index(req: Request): any {
        return {
            hello: this.userService.helloWorld(req.params.id),
        };
    }
}
