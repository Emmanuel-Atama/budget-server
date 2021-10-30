import Command from "../Command";

export default class GetAccountsByUserId implements Command {
    private readonly _userId: number;

    constructor(userId: number) {
        this._userId = userId;
    }

    get userId(): number {
        return this._userId;
    }

    getName(): string {
        return 'GetAccountsByUserId';
    }
}