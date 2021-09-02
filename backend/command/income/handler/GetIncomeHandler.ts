import { Income } from "@prisma/client";
import { IncomeConnection } from "../../../data/IncomeConnection";
import { CommandHandler } from "../../CommandHandler";
import { GetIncome } from "../GetIncome";

export class GetIncomeHandler implements CommandHandler {
    private connection: IncomeConnection;

    constructor(connection: IncomeConnection) {
        this.connection = connection;
    }

    async handle(command: GetIncome): Promise<Income | null> {
        return await this.connection.getOne(command.id);
    }
}