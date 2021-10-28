import { Application } from "express";
import { ApiRouter } from "./ApiRouter";

export class Server {
    private app: Application;
    private router: ApiRouter;

    constructor(app: Application, router: ApiRouter) {
        this.app = app;
        this.router = router;
    }

    public start(port: number): void {
        this.router.initializeRoutes();
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}