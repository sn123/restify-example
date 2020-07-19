import { User } from '../models/user';
import { getRepository, MigrationInterface } from 'typeorm';

export class CreateTestUser1595181097501 implements MigrationInterface {
    public async up(): Promise<void> {
        const user = new User();
        user.name = 'test';
        user.email = 'test@example.com';
        user.password = 'password';
        user.hashPassword();
        await getRepository(User).save(user);
    }

    public async down(): Promise<void> {
        const user = await getRepository(User).findOne({
            email: 'test@example.com',
        });
        if (user) {
            await getRepository(User).remove(user);
        }
    }
}
