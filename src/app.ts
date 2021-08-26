import { Server } from "./Server";
import express, { Application } from 'express';

const app: Application = express();
const PORT = 4000;
const server = new Server(app);

server.start(PORT);