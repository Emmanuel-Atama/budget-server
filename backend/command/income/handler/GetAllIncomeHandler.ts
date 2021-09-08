import { Repository } from "../../../data/Repository";
import { Income } from "../../../model/Income";
import { CommandHandler } from "../../CommandHandler";
import { GetAllIncome } from "../GetAllIncome";

export class GetAllIncomeHandler implements CommandHandler {
    private repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
    }

    async handle(command: GetAllIncome): Promise<Income[]> {
        return await this.repository.getMany(command.limit) as Income[];
    }
}