import Entity from "../Entity";

export default class CategoryGroup implements Entity {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _budgetId: number;

    constructor(id: number, name: string, budgetId: number) {
        this._id = id;
        this._name = name;
        this._budgetId = budgetId;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get budgetId(): number {
        return this._budgetId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            budgetId: this.budgetId
        };
    }
}