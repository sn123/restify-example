import * as dotenv from 'dotenv';
import * as path from 'path';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';

class Env {
    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): {
        PORT: number;
        passportStrategy: StrategyOptions;
        JWT_AUTH_HEADER: string;
        JWT_SECRET: string;
        PER_PAGE: number;
        APP_NAME: string;
        ENVIRONMENT: string;
        BUGSNAG_API_KEY: string;
        IS_BUGSNAG_ENABLED: boolean;
        TIMEZONE_OFFSET: number;
    } {
        dotenv.config({ path: path.join(__dirname, '../../../.env') });

        const PORT = process.env.ENVIRONMENT === 'LOCAL' ? 4201 : 3000;
        const JWT_AUTH_HEADER = 'jwt';
        const JWT_SECRET = process.env.JWT_SECRET || 'randomText';
        const passportStrategy: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(JWT_AUTH_HEADER),
            secretOrKey: JWT_SECRET,
        };

        const PER_PAGE = 100;

        // APP Meta Data
        const APP_NAME = process.env.APP_NAME || 'Example';
        const ENVIRONMENT = process.env.ENVIRONMENT || 'LOCAL';

        const IS_BUGSNAG_ENABLED = process.env.IS_BUGSNAG_ENABLED
            ? process.env.IS_BUGSNAG_ENABLED.toLowerCase() === 'true'
                ? true
                : false
            : false;

        const BUGSNAG_API_KEY = IS_BUGSNAG_ENABLED ? process.env.BUGSNAG_API_KEY || '' : '';
        const TIMEZONE_OFFSET = process.env.TIMEZONE_OFFSET ? parseInt(process.env.TIMEZONE_OFFSET) : 19800;

        return {
            PORT,
            passportStrategy,
            JWT_AUTH_HEADER,
            JWT_SECRET,
            PER_PAGE,
            APP_NAME,
            ENVIRONMENT,
            BUGSNAG_API_KEY,
            IS_BUGSNAG_ENABLED,
            TIMEZONE_OFFSET,
        };
    }
}

const env = Env.config();
export { env };
