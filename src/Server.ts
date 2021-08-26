import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { Router } from "./Router";

export class Server {
    private app: Application;
    private router: Router;

    constructor(app: Application) {
        this.app = app;
        this.router = new Router(this.app);
    }

    public start(port: number): void {
        this.router.initializeRoutes('/api');
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}