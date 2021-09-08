import { Repository } from "../../../data/Repository";
import { Income } from "../../../model/Income";
import { CommandHandler } from "../../CommandHandler";
import { GetIncome } from "../GetIncome";

export class GetIncomeHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetIncome): Promise<Income | null> {
        return await this.repository.getOne(command.id) as Income;
    }
}