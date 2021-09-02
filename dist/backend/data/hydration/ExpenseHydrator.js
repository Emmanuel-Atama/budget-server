"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseHydrator = void 0;
const Expense_1 = require("../../model/Expense");
class ExpenseHydrator {
    static hydrate(raw) {
        const { id, name, source, amount, timestamp } = raw;
        return new Expense_1.Expense(id, name, source, amount, timestamp);
    }
    static dehydrate(expense) {
        return expense.toJSON();
    }
}
exports.ExpenseHydrator = ExpenseHydrator;
