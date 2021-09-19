import { Expense } from "../../model/Expense";
import { EntityCommand } from "../EntityCommand";

export class CreateExpense implements EntityCommand {
    private readonly _expense: Expense;

    constructor(expense: Expense) {
        this._expense = expense;
    }

    get entity(): Expense {
        return this._expense;
    }

    getName(): string {
        return 'CreateExpense';
    }
}