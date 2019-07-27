import { injectable } from 'inversify';

@injectable()
export class UserService {
    public helloWorld(id: number): string {
        return `hello world  ${id}`;
    }
}
