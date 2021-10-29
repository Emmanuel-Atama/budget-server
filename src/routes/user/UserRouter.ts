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
        this.app.get(`${this.apiUrl}/user/:id`, (req, res) => this.controller.getById(req, res));
        this.app.post(`${this.apiUrl}/register`, (req, res) => this.controller.register(req, res));
        this.app.post(`${this.apiUrl}/login`, (req, res) => this.controller.login(req, res));
        this.app.get(`${this.apiUrl}/user`, (req, res) => this.controller.getAll(req, res));
    }
}