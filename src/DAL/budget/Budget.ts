import Entity from "../Entity";

export default class Budget implements Entity {
    private readonly _id: number;
    private readonly _userId: number;
    private readonly _yearMonth: number;

    constructor(id: number, userId: number, yearMonth: number) {
        this._id = id;
        this._userId = userId;
        this._yearMonth = yearMonth;
    }

    get id(): number {
        return this._id;
    }

    get userId(): number {
        return this._userId;
    }

    get yearMonth(): number {
        return this._yearMonth;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            yearMonth: this.yearMonth
        };
    }
}