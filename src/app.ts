import { Server } from "./Server";
import express, { Application } from 'express';

const app: Application = express();
const PORT: number = 4000;
const server: Server = new Server(app);

server.start(PORT);