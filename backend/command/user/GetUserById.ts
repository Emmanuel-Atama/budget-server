import IdentityCommand from "../IdentityCommand";

export default class GetUserById implements IdentityCommand {
    private readonly _id;

    constructor(id: number) {
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    getName(): string {
        return 'GetUserById';
    }
}