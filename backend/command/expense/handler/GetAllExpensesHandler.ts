import { ExpenseConnection } from "../../../data/ExpenseConnection";
import { Expense } from "../../../model/Expense";
import { CommandHandler } from "../../CommandHandler";
import { GetAllExpenses } from "../GetAllExpenses";

export class GetAllExpensesHandler implements CommandHandler {
    private connection: ExpenseConnection;

    constructor(connection: ExpenseConnection) {
        this.connection = connection;
    }

    async handle(command: GetAllExpenses): Promise<Expense[]> {
        return await this.connection.getMany(command.limit);
    }
}