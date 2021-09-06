import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { CommandHandler } from "../../CommandHandler";
import { CreateIncome } from "../CreateIncome";

export class CreateIncomeHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: CreateIncome): Promise<void> {
        this.connection.create(command.income);
    }
}