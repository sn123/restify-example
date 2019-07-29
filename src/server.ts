import 'reflect-metadata';
import * as restify from 'restify';
import { Container } from 'inversify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import { Controllers, Services } from './bootstrap';
// import { HttpError } from 'restify-errors';
// set up container
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
