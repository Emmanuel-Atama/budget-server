import { IncomeConnection } from "../../../data/IncomeConnection";
import { CommandHandler } from "../../CommandHandler";
import { CreateIncome } from "../CreateIncome";

export class CreateIncomeHandler implements CommandHandler {
    private connection: IncomeConnection;

    constructor(connection: IncomeConnection) {
        this.connection = connection;
    }

    async handle(command: CreateIncome): Promise<void> {
        this.connection.create(command.income);
    }
}