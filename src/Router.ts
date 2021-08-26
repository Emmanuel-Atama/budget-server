import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

export class Router {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public initializeRoutes(apiUrl: string): void {
        this.app.use(express.static(`${path.resolve('./')}/dist/frontend`));

        this.app.get(apiUrl, (req: Request, res: Response, next: NextFunction): void => {
            res.send('The API has been reached!');
        });

        this.app.get('*', (req: Request, res: Response): void => {
            res.sendFile(`${path.resolve("./")}/dist/frontend/index.html`);
        });
    }
}