import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { mockExpenses, mockIncome } from "./mockData";
import { Expense } from "./model/Expense";
import { Income } from "./model/Income";

export class Router {
    private app: Application;
    private apiUrl: string;

    constructor(app: Application, apiUrl: string) {
        this.app = app;
        this.apiUrl = apiUrl;
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
            res.json(mockExpenses);
        });

        this.app.get(`${this.apiUrl}/expense/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);
            const found: Expense | undefined = mockExpenses.find(expense => expense.id === id);

            if (found) {
                res.json(found);
                return;
            }

            res.status(404).json({
                message: `No expense found with ID ${id}`
            });
        });
    }

    private initializeIncomeRoutes(): void {
        this.app.get(`${this.apiUrl}/income`, (req: Request, res: Response): void => {
            res.json(mockIncome);
        });

        this.app.get(`${this.apiUrl}/income/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);
            const found: Income | undefined = mockIncome.find(income => income.id === id);

            if (found) {
                res.json(found);
                return;
            }

            res.status(404).json({
                message: `No income found with ID ${id}`
            });
        });
    }
}