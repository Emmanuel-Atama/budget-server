import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { Income } from "../../../model/Income";
import { CommandHandler } from "../../CommandHandler";
import { GetIncome } from "../GetIncome";

export class GetIncomeHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: GetIncome): Promise<Income | null> {
        return await this.connection.getOne(command.id) as Income;
    }
}