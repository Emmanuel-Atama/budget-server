import { DatabaseConnection } from "../../../data/DatabaseConnection";
import { Income } from "../../../model/Income";
import { CommandHandler } from "../../CommandHandler";
import { GetAllIncome } from "../GetAllIncome";

export class GetAllIncomeHandler implements CommandHandler {
    private connection: DatabaseConnection;

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }

    async handle(command: GetAllIncome): Promise<Income[]> {
        return await this.connection.getMany(command.limit) as Income[];
    }
}