import { Application, Request, Response, NextFunction } from "express";
import CommandBus from "./command/CommandBus";
import GetAllIncome from "./command/income/GetAllIncome";
import GetIncome from "./command/income/GetIncome";
import Router from "./Router";
import ExpenseRouter from "./routes/expense/ExpenseRouter";
import UserRouter from "./routes/user/UserRouter";

export class ApiRouter implements Router {
    private app: Application;
    private apiUrl: string;
    private commandBus: CommandBus;

    constructor(app: Application, apiUrl: string, commandBus: CommandBus) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.commandBus = commandBus;
    }

    public initializeRoutes(): void {
        this.app.get(this.apiUrl, (req: Request, res: Response): void => {
            res.send('This is the API\'s base URL!');
        });

        (new ExpenseRouter(this.app, this.apiUrl)).initializeRoutes();
        (new UserRouter(this.app, this.apiUrl)).initializeRoutes();
    }

    private initializeIncomeRoutes(): void {
        this.app.get(`${this.apiUrl}/income`, (req: Request, res: Response): void => {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

            this.commandBus.dispatch(new GetAllIncome(limit)).then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/income/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);

            this.commandBus.dispatch(new GetIncome(id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    error: `No income found with ID ${id}`
                });
            });
        });
    }
}