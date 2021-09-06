import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { Expense } from "../../../model/Expense";
import { CommandHandler } from "../../CommandHandler";
import { GetExpense } from "../GetExpense";

export class GetExpenseHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: GetExpense): Promise<Expense | null> {
        return await this.connection.getOne(command.id) as Expense;
    }
}