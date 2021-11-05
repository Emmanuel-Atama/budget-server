import { Application, Response } from "express";
import Auth from "../../auth/Auth";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import Router from "../../Router";
import BudgetController from "./BudgetController";

export default class BudgetRouter implements Router {
    private app: Application;
    private apiUrl: string;
    private controller: BudgetController;
    private authMiddleware: Auth;

    constructor(app: Application, apiUrl: string, controller: BudgetController, authMiddleware: Auth) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.controller = controller;
        this.authMiddleware = authMiddleware;
    }

    public initializeRoutes(): void {
        // this.app.get(`${this.apiUrl}/budget`, this.authMiddleware.verify, async (req: AuthenticatedRequest, res: Response) => await this.controller.getAll(req, res));
        this.app.post(`${this.apiUrl}/budget`, this.authMiddleware.verify, async (req: AuthenticatedRequest, res: Response) => await this.controller.create(req, res));
    }
}