import * as passport from 'passport';
import { env } from '../helpers';
import { User } from '../../database/models';
import { getRepository } from 'typeorm';
import { Strategy } from 'passport-jwt';
/* eslint-disable @typescript-eslint/no-explicit-any */

export class PassportMiddleWare {
    public static authenticate(): any {
        return passport.authenticate(env.JWT_AUTH_HEADER, {
            session: false,
        });
    }

    public static init(): any {
        passport.use(
            new Strategy(
                env.passportStrategy,
                async (jwtPayload: any, done: any): Promise<any> => {
                    try {
                        const userId = jwtPayload.id;

                        const user = await getRepository(User).findOne({
                            where: {
                                id: userId,
                            },
                        });

                        return done(null, user);
                    } catch (error) {
                        done(null, false);
                    }
                },
            ),
        );
    }
}
