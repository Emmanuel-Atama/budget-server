import { Application } from "express";
import Router from "../../Router";
import UserController from "./UserController";

export default class UserRouter implements Router {
    private app: Application;
    private apiUrl: string;
    private controller: UserController;

    constructor(app: Application, apiUrl: string, controller: UserController) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.controller = controller
    }

    public initializeRoutes(): void {
        this.app.get(`${this.apiUrl}/user/:id`, this.controller.getById);
        this.app.post(`${this.apiUrl}/register`, this.controller.register);
        this.app.post(`${this.apiUrl}/login`, this.controller.login);
        this.app.get(`${this.apiUrl}/user`, this.controller.getAll);
    }
}