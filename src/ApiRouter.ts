import { Application, Request, Response } from "express";
import Router from "./Router";
import UserRouter from "./routes/user/UserRouter";

export class ApiRouter implements Router {
    private app: Application;
    private apiUrl: string;

    constructor(app: Application, apiUrl: string) {
        this.app = app;
        this.apiUrl = apiUrl;
    }

    public initializeRoutes(): void {
        this.app.get(this.apiUrl, (req: Request, res: Response): void => {
            res.send('This is the API\'s base URL!');
        });

        (new UserRouter(this.app, this.apiUrl)).initializeRoutes();
    }
}