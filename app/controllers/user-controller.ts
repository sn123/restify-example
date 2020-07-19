import { ControllerBase } from './controller-base';
import { CreateUserValidator } from '../validators/create-user-validator';
import { PassportMiddleWare } from '../middleware';
import { ResponseViewModel } from '../viewmodels/response-viewmodel';
import { User } from '../models';
import { User as UserModel } from '../../database/models';
import { UserServiceContract } from '../services/user-service';
import { WithUserRequest } from '../types/request-type';
import { Controller, Get, interfaces, Post, Put } from 'inversify-restify-utils';
import { inject, injectable } from 'inversify';
import { Request } from 'restify';

@Controller('/user')
@injectable()
export class UserController extends ControllerBase implements interfaces.Controller {
    public constructor(@inject('UserService') private readonly userService: UserServiceContract) {
        super();
    }

    @Get('/me', PassportMiddleWare.authenticate())
    public async profile(request: WithUserRequest): Promise<ResponseViewModel<UserModel>> {
        const userId = request.user.id;

        return this.userService.profile(userId);
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
    public async update(request: Request): Promise<ResponseViewModel<User | null> | null> {
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
