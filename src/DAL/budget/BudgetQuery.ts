import Query from "../Query";

export default class BudgetQuery implements Query {
    private _userId: number | null = null;
    private _yearMonth: number | null = null;

    set userId(userId: number | null) {
        this._userId = userId;
    }

    get userId(): number | null {
        return this._userId;
    }

    set yearMonth(yearMonth: number | null) {
        this._yearMonth = yearMonth;
    }

    get yearMonth(): number | null {
        return this._yearMonth;
    }
}