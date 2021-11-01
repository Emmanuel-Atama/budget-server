import Budget from "../../DAL/budget/Budget";
import EntityCommand from "../EntityCommand";

export default class CreateBudget implements EntityCommand {
    private readonly _budget: Budget;

    constructor(budget: Budget) {
        this._budget = budget;
    }

    get entity(): Budget {
        return this._budget;
    }

    getName(): string {
        return 'CreateBudget';
    }
}
