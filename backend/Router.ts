import { Application, Request, Response, NextFunction } from "express";
import CommandBus from "./command/CommandBus";
import GetAllExpenses from "./command/expense/GetAllExpenses";
import GetExpense from "./command/expense/GetExpense";
import GetAllIncome from "./command/income/GetAllIncome";
import GetIncome from "./command/income/GetIncome";
import CreateUser from "./command/user/CreateUser";
import GetAllUsers from "./command/user/GetAllUsers";
import GetUserById from "./command/user/GetUserById";
import GetUserByUsername from "./command/user/GetUserByUsername";
import User from "./model/User";
import bcrypt from 'bcrypt';

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
        this.app.get(this.apiUrl, (req: Request, res: Response, next: NextFunction): void => {
            res.send('This is the API\'s base URL!');
        });

        this.initializeIncomeRoutes();
        this.initializeExpenseRoutes();
        this.initializeUserRoutes();
    }

    private initializeUserRoutes(): void {
        this.app.get(`${this.apiUrl}/user/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);

            this.commandBus.dispatch(new GetUserById(id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    error: `No user found with ID ${id}`
                });
            });
        });

        this.app.post(`${this.apiUrl}/register`, (req: Request, res: Response): void => {
            try {
                const {
                    username,
                    password
                } = req.body;
    
                this.commandBus.dispatch(new CreateUser(new User(0, username, password, new Date))).then(() => {
                    res.json({
                        message: 'User created successfully!'
                    });
                });
            } catch (e) {
                res.status(500).json({
                    error: 'Something went wrong. This might not be your fault.'
                });
            }
        });

        this.app.post(`${this.apiUrl}/login`, (req: Request, res: Response): void => {
            try {
                const {
                    username,
                    password // TODO this should be encrypted before being sent
                } = req.body;

                this.commandBus.dispatch(new GetUserByUsername(username)).then(user => {
                    bcrypt.compare(password, user.password).then(result => {
                        if (result) {
                            return;
                            // todo password was correct, create a cookie!
                        }

                        res.status(400).json({
                            error: 'Invalid username and/or password.'
                        });
                    });
                });
            } catch (e) {
                res.status(500).json({
                    error: 'Something went wrong. This might not be your fault.'
                });
            }
        });

        this.app.get(`${this.apiUrl}/user`, (req: Request, res: Response): void => {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
            
            this.commandBus.dispatch(new GetAllUsers(limit)).then(data => res.json(data));
        });
    }

    private initializeExpenseRoutes(): void {
        this.app.get(`${this.apiUrl}/expense`, (req: Request, res: Response): void => {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

            this.commandBus.dispatch(new GetAllExpenses(limit)).then(data => res.json(data));
        });

        this.app.get(`${this.apiUrl}/expense/:id`, (req: Request, res: Response): void => {
            const id: number = parseInt(req.params.id);

            this.commandBus.dispatch(new GetExpense(id)).then(data => {
                if (data) {
                    res.json(data);
                    return;
                }

                res.status(404).json({
                    error: `No expense found with ID ${id}`
                });
            })
        });
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