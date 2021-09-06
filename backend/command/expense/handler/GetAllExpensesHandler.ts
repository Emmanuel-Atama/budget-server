import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { Expense } from "../../../model/Expense";
import { CommandHandler } from "../../CommandHandler";
import { GetAllExpenses } from "../GetAllExpenses";

export class GetAllExpensesHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: GetAllExpenses): Promise<Expense[]> {
        return await this.connection.getMany(command.limit) as Expense[];
    }
}