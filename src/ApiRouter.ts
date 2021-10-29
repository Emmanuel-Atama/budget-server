import { Application, Request, Response } from "express";
import Router from "./Router";
import UserController from "./routes/user/UserController";
import UserRouter from "./routes/user/UserRouter";
import bcrypt from 'bcrypt';
import CommandBus from "./command/CommandBus";
import jwt from 'jsonwebtoken';

export class ApiRouter implements Router {
    private app: Application;
    private apiUrl: string;
    private commandBus: CommandBus;

    constructor(app: Application, apiUrl: string, commandBus: CommandBus) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.commandBus = commandBus;
    }

    public initializeRoutes(): void {
        this.app.get(this.apiUrl, (req: Request, res: Response): void => {
            res.send('This is the API\'s base URL!');
        });

        const userController = new UserController(this.commandBus, bcrypt, jwt);

        (new UserRouter(this.app, this.apiUrl, userController)).initializeRoutes();
    }
}