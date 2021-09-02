import { Application } from "express";
import { Router } from "./Router";

export class Server {
    private app: Application;
    private router: Router;

    constructor(app: Application, router: Router) {
        this.app = app;
        this.router = router;
    }

    public start(port: number): void {
        this.router.initializeRoutes();
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}