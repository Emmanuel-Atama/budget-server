import { Application } from "express";
import Router from "../../Router";
import { getAll, getById, login, register } from "./controller";

export default class UserRouter implements Router {
    private app: Application;
    private apiUrl: string;

    constructor(app: Application, apiUrl: string) {
        this.app = app;
        this.apiUrl = apiUrl;
    }

    public initializeRoutes(): void {
        this.app.get(`${this.apiUrl}/user/:id`, getById);
        this.app.post(`${this.apiUrl}/register`, register);
        this.app.post(`${this.apiUrl}/login`, login);
        this.app.get(`${this.apiUrl}/user`, getAll);
    }
}