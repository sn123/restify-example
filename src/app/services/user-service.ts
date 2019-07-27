import { injectable } from 'inversify';

export interface UserServiceContract {
    helloWorld(id: number): string;
}
@injectable()
export class UserService implements UserServiceContract {
    public helloWorld(id: number): string {
        return `hello world  ${id}`;
    }
}
