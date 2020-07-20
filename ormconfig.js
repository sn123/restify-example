// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: process.env.TYPEORM_PORT || 3306,
    synchronize: false,
    logging: process.env.TYPEORM_LOGGING.toLowerCase() === 'true' ? true : false,
    entities: ['./dist/database/models/**/*.js'],
    migrations: ['./dist/database/migrations/**/*.js'],
    cli: {
        entitiesDir: './database/models',
        migrationsDir: './database/migrations',
    },
};
