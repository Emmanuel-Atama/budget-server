"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const ExpenseConnection_1 = require("./data/ExpenseConnection");
const IncomeConnection_1 = require("./data/IncomeConnection");
const mockData_1 = require("./mockData");
const dbClient_1 = __importDefault(require("./utils/dbClient"));
class Router {
    constructor(app, apiUrl) {
        this.app = app;
        this.apiUrl = apiUrl;
        this.incomeConnection = new IncomeConnection_1.IncomeConnection(dbClient_1.default);
        this.expenseConnection = new ExpenseConnection_1.ExpenseConnection(dbClient_1.default);
    }
    initializeRoutes() {
        this.app.use(express_1.default.static(`${path_1.default.resolve('./')}/dist/frontend`));
        this.initializeApiRoutes();
        this.app.get('*', (req, res) => {
            res.sendFile(`${path_1.default.resolve("./")}/dist/frontend/index.html`);
        });
    }
    initializeApiRoutes() {
        this.app.get(this.apiUrl, (req, res, next) => {
            res.send('This is the API\'s base URL!');
        });
        this.initializeIncomeRoutes();
        this.initializeExpenseRoutes();
    }
    initializeExpenseRoutes() {
        this.app.get(`${this.apiUrl}/expense`, (req, res) => {
            this.expenseConnection.getMany().then(data => res.json(data));
        });
        this.app.get(`${this.apiUrl}/expense/:id`, (req, res) => {
            const id = parseInt(req.params.id);
            const found = mockData_1.mockExpenses.find(expense => expense.id === id);
            if (found) {
                res.json(found);
                return;
            }
            res.status(404).json({
                message: `No expense found with ID ${id}`
            });
        });
    }
    initializeIncomeRoutes() {
        this.app.get(`${this.apiUrl}/income`, (req, res) => {
            res.json(mockData_1.mockIncome);
        });
        this.app.get(`${this.apiUrl}/income/:id`, (req, res) => {
            const id = parseInt(req.params.id);
            const found = mockData_1.mockIncome.find(income => income.id === id);
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
exports.Router = Router;
