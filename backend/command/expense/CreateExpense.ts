import { Expense } from "../../model/Expense";
import { Command } from "../Command";

export class CreateExpense implements Command {
    private readonly _expense: Expense;

    constructor(expense: Expense) {
        this._expense = expense;
    }

    get expense(): Expense {
        return this._expense;
    }

    getName(): string {
        return 'CreateExpense';
    }
}