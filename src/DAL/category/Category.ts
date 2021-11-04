import Entity from "../Entity";

export default class Category implements Entity {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _amount: number;
    private readonly _groupId: number;

    constructor(id: number, name: string, amount: number, groupId: number) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._groupId = groupId;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get categoryGroupId(): number {
        return this._groupId;
    }

    get amount(): number {
        return this._amount;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            categoryGroupId: this.categoryGroupId,
        };
    }
}