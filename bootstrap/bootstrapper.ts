import * as cluster from 'cluster';
import * as os from 'os';
import * as restify from 'restify';
import Bugsnag from '@bugsnag/js';
import { Controllers, Services } from './';
import { Container } from 'inversify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import { PassportMiddleWare } from '../app/middleware/index';
import { createConnection } from 'typeorm';
import { env } from '../app/helpers';

export class Bootstrapper {
    public static bootstrap(): void {
        if (cluster.isMaster) {
            const numCpus = os.cpus().length;
            for (let i = 0; i < numCpus; i++) {
                cluster.fork();
            }
            cluster.on('exit', (): void => {
                cluster.fork();
            });
            return;
        }
        this.bootstrapWorker();
    }

    private static bootstrapWorker(): void {
        new Promise(
            async (resolve, reject): Promise<void> => {
                try {
                    Bugsnag.start({
                        apiKey: 'ef38e6e76834f9ebb8a0bfbc30621b3f',
                        // plugins: [Bugsnag.getPlugin('restify')],
                        // otherOptions: value
                    });
                    await createConnection();

                    let container = new Container();
                    Controllers.bootstrap(container);
                    Services.bootstrap(container);
                    // create server
                    let server = new InversifyRestifyServer(container, { defaultRoot: '/api' });
                    const middleware = Bugsnag.getPlugin('restify');

                    let app = server.build();
                    // This must be the first piece of middleware in the stack.
                    // It can only capture errors in downstream middleware
                    if (middleware) {
                        app.pre(middleware.requestHandler);
                    }
                    app.use(restify.plugins.acceptParser(app.acceptable));
                    app.use(
                        restify.plugins.bodyParser({
                            mapParams: true,
                        }),
                    );
                    app.use(restify.plugins.queryParser());
                    PassportMiddleWare.init();
                    app.listen(env.PORT);
                    if (middleware) {
                        app.on('restifyError', middleware.errorHandler);
                    }
                    resolve();
                } catch (error) {
                    reject(error);
                }
            },
        );
    }
}
