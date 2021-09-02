import { IncomeConnection } from "../../../data/IncomeConnection";
import { CommandHandler } from "../../CommandHandler";
import { GetAllIncome } from "../GetAllIncome";

export class GetAllIncomeHandler implements CommandHandler {
    private connection: IncomeConnection;

    constructor(connection: IncomeConnection) {
        this.connection = connection;
    }

    async handle(command: GetAllIncome) {
        return await this.connection.getMany(command.limit);
    }
}