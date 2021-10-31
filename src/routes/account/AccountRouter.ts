import { Application, Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import AuthMiddleware from "../../auth/AuthMiddleware";
import Router from "../../Router";
import AccountController from "./AccountController";

export default class AccountRouter implements Router {
    private app: Application;
    private apiUrl: string;
    private controller: AccountController;
    private authMiddleware: AuthMiddleware;

    constructor(app: Application, apiUrl: string, controller: AccountController, authMiddleware: AuthMiddleware) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.controller = controller;
        this.authMiddleware = authMiddleware;
    }

    public initializeRoutes(): void {
        this.app.get(`${this.apiUrl}/account`, this.authMiddleware.verify, (req: AuthenticatedRequest, res: Response) => this.controller.getAllByUsername(req, res));
        this.app.post(`${this.apiUrl}/account`, this.authMiddleware.verify, (req: AuthenticatedRequest, res: Response) => this.controller.createOneForUser(req, res));
    }
}