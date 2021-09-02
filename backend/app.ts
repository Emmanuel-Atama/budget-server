import { Server } from "./Server";
import express, { Application } from 'express';
import { Router } from "./Router";
import commandBus from "./utils/commandBus";

const app: Application = express();
const router: Router = new Router(app, '/api', commandBus);
const server: Server = new Server(app, router);

const PORT: number = 4000;

server.start(PORT);