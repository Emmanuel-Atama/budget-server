import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { CommandBus } from "./command/CommandBus";
import { GetAllExpenses } from "./command/expense/GetAllExpenses";
import { GetExpense } from "./command/expense/GetExpense";
import { GetAllIncome } from "./command/income/GetAllIncome";
import { GetIncome } from "./command/income/GetIncome";

export class Router {
    private app: Application;
    private apiUrl: string;
    private commandBus: CommandBus;

    constructor(app: Application, apiUrl: string, commandBus: CommandBus) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.commandBus = commandBus;
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
            this.commandBus.dispatch(new GetAllExpenses).then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/expense/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);

            this.commandBus.dispatch(new GetExpense(id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    message: `No expense found with ID ${id}`
                });
            })
        });
    }

    private initializeIncomeRoutes(): void {
        this.app.get(`${this.apiUrl}/income`, (req: Request, res: Response): void => {
            this.commandBus.dispatch(new GetAllIncome).then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/income/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);

            this.commandBus.dispatch(new GetIncome(id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    message: `No income found with ID ${id}`
                });
            });
        });
    }
}