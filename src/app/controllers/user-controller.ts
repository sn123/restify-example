import { Request } from 'restify';
import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { inject, injectable } from 'inversify';
import { UserServiceContract } from '../services/user-service';
import { User } from '../models';

@Controller('/user')
@injectable()
export class UserController implements interfaces.Controller {
    public constructor(@inject('UserService') private readonly userService: UserServiceContract) {}

    @Get('/:id')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public index(req: Request): User {
        const { id } = req.params;
        return this.userService.get(id);
        // TODO: create a base controller method to return response
    }
}
