import GetManyCommand from "../GetManyCommand";

export default class GetAllExpenses implements GetManyCommand {
    private readonly _limit;

    constructor(limit?: number) {
        this._limit = limit;
    }

    get limit(): number | undefined {
        return this._limit;
    }

    getName(): string {
        return 'GetAllExpenses';
    }
}