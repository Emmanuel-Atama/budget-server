import { Application } from "express";
import Router from "../../Router";
import { getAll, getById } from "../user/controller";

export default class ExpenseRouter implements Router {
    private app: Application;
    private apiUrl: string;

    constructor(app: Application, apiUrl: string) {
        this.app = app;
        this.apiUrl = apiUrl;
    }

    public initializeRoutes(): void {
        this.app.get(`${this.apiUrl}/expense`, getAll);
        this.app.get(`${this.apiUrl}/expense/:id`, getById);
    }
}