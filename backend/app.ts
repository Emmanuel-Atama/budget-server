import { Server } from "./Server";
import express, { Application } from 'express';
import { Router } from "./Router";
import commandBus from "./utils/commandBus";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router: Router = new Router(app, '/api', commandBus);
const server: Server = new Server(app, router);

const PORT: number = 4000;

server.start(PORT);