"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockExpenses = exports.mockIncome = void 0;
const Expense_1 = require("./model/Expense");
const Income_1 = require("./model/Income");
const mockIncome = [
    new Income_1.Income(1, 'Nathan', 2560, new Date()),
    new Income_1.Income(2, 'Cheryl', 230, new Date())
];
exports.mockIncome = mockIncome;
const mockExpenses = [
    new Expense_1.Expense(1, 'Phone Bill', 'Nathan', 29.99, new Date()),
    new Expense_1.Expense(2, 'Internet', 'Family', 24.99, new Date()),
    new Expense_1.Expense(3, 'Rent', 'Family', 550, new Date()),
];
exports.mockExpenses = mockExpenses;
