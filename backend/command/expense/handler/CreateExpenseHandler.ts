import { ExpenseConnection } from "../../../data/ExpenseConnection";
import { CommandHandler } from "../../CommandHandler";
import { CreateExpense } from "../CreateExpense";

export class CreateExpenseHandler implements CommandHandler {
    private connection;

    constructor(connection: ExpenseConnection) {
        this.connection = connection;
    }

    async handle(command: CreateExpense): Promise<undefined> {
        await this.connection.create(command.expense);
        return;
    }
}