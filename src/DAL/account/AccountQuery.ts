import Query from "../Query";

export default class AccountQuery implements Query {
    private _budgetId: number | null = null;

    set budgetId(budgetId: number | null) {
        this._budgetId = budgetId;
    }

    get budgetId(): number | null {
        return this._budgetId;
    }
}