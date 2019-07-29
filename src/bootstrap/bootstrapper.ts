import * as restify from 'restify';
import { Container } from 'inversify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import { Controllers, Services } from './';
import * as cluster from 'cluster';
import * as os from 'os';

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
        let container = new Container();
        Controllers.bootstrap(container);
        Services.bootstrap(container);
        // create server
        let server = new InversifyRestifyServer(container);
        let app = server.build();
        app.use(restify.plugins.acceptParser(app.acceptable));
        app.use(restify.plugins.bodyParser());
        app.use(restify.plugins.queryParser());

        app.listen(3000);
    }
}
