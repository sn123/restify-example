import { Request } from 'restify';
import { Controller, Get, interfaces, Post, Put } from 'inversify-restify-utils';
import { inject, injectable } from 'inversify';
import { UserServiceContract } from '../services/user-service';
import { User } from '../models';
import { CreateUserValidator } from '../validators/create-user-validator';
import { ResponseViewModel } from '../viewmodels/response-viewmodel';
import { Validator } from '../middleware/validator';
import { ControllerBase } from './controller-base';

@Controller('/user', Validator)
@injectable()
export class UserController extends ControllerBase implements interfaces.Controller {
    public constructor(@inject('UserService') private readonly userService: UserServiceContract) {
        super();
    }

    @Get('/:id')
    public index(req: Request): User {
        const { id } = req.params;
        return this.userService.get(id);
        // TODO: create a base controller method to return response
    }

    /**
     * This example uses route spec to validate
     */
    @Post(
        Object.assign(
            {},
            {
                options: null,
                path: '/',
                validation: {
                    validator: CreateUserValidator,
                    type: 'body',
                },
            },
        ),
    )
    public create(): ResponseViewModel<User> {
        const response = new ResponseViewModel<User>();
        response.data = new User();
        return response;
    }

    /**
     * This example uses explicit validation instead of annotating the route
     * @param request
     */
    @Put('/:id')
    public update(request: Request): ResponseViewModel<User | null> {
        const validationResult = super.validate<User>(request, CreateUserValidator);
        if (validationResult) {
            return validationResult;
        }
        // otherwise we make the post call and let it be
        const response = new ResponseViewModel<User>();
        response.data = new User();
        return response;
    }
}
