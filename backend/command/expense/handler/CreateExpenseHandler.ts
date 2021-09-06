import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { CommandHandler } from "../../CommandHandler";
import { CreateExpense } from "../CreateExpense";

export class CreateExpenseHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: CreateExpense): Promise<void> {
        await this.connection.create(command.expense);
    }
}