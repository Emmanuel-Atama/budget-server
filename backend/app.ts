import { Server } from "./Server";
import express, { Application } from 'express';
import { ApiRouter } from "./ApiRouter";
import commandBus from "./utils/commandBus";
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router: ApiRouter = new ApiRouter(app, '/api', commandBus);
const server: Server = new Server(app, router);

const PORT: number = 4000;

server.start(PORT);