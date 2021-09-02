import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { ExpenseConnection } from "./data/ExpenseConnection";
import { IncomeConnection } from "./data/IncomeConnection";
import dbClient from "./utils/dbClient";

export class Router {
    private app: Application;
    private apiUrl: string;
    private incomeConnection: IncomeConnection;
    private expenseConnection: ExpenseConnection;

    constructor(app: Application, apiUrl: string) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.incomeConnection = new IncomeConnection(dbClient);
        this.expenseConnection = new ExpenseConnection(dbClient);
    }

    public initializeRoutes(): void {
        this.app.use(express.static(`${path.resolve('./')}/dist/frontend`));

        this.initializeApiRoutes();

        this.app.get('*', (req: Request, res: Response): void => {
            res.sendFile(`${path.resolve("./")}/dist/frontend/index.html`);
        });
    }

    private initializeApiRoutes(): void {
        this.app.get(this.apiUrl, (req: Request, res: Response, next: NextFunction): void => {
            res.send('This is the API\'s base URL!');
        });

        this.initializeIncomeRoutes();
        this.initializeExpenseRoutes();
    }

    private initializeExpenseRoutes(): void {
        this.app.get(`${this.apiUrl}/expense`, (req: Request, res: Response): void => {
            this.expenseConnection.getMany().then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/expense/:id`, (req: Request, res: Response): void => {
            this.expenseConnection.getOne(parseInt(req.params.id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    message: `No expense found with ID ${req.params.id}`
                });
            });
        });
    }

    private initializeIncomeRoutes(): void {
        this.app.get(`${this.apiUrl}/income`, (req: Request, res: Response): void => {
            this.incomeConnection.getMany().then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/income/:id`, (req: Request, res: Response): void => {
            this.incomeConnection.getOne(parseInt(req.params.id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    message: `No income found with ID ${req.params.id}`
                });
            });
        });
    }
}