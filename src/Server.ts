import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

export class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;

        this.app.use(express.static(`${path.resolve('./')}/dist/frontend`));

        this.app.get('/api', (req: Request, res: Response, next: NextFunction): void => {
            res.send('API has been initialized!');
        });

        this.app.get('*', (req: Request, res: Response): void => {
            res.sendFile(`${path.resolve("./")}/dist/frontend/index.html`);
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}