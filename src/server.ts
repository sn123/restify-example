import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import { Controllers, Services } from './bootstrap';
// set up container
let container = new Container();
Controllers.bootstrap(container);
Services.bootstrap(container);
// create server
let server = new InversifyRestifyServer(container);
let app = server.build();
app.listen(3000);
