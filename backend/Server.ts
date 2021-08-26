import { Application } from "express";
import { Router } from "./Router";

export class Server {
    private app: Application;
    private router: Router;

    constructor(app: Application) {
        this.app = app;
        this.router = new Router(this.app, '/api');
    }

    public start(port: number): void {
        this.router.initializeRoutes();
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}