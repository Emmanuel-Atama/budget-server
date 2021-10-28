import Entity from "./Entity";
import Timestamped from "./Timestamped";

export default class Transaction implements Entity, Timestamped {
    private readonly _id: number;
    private readonly _accountId: number;
    private readonly _categoryId: number;
    private readonly _budgetId: number;
    private readonly _payee: string;
    private readonly _description: string;
    private readonly _amount: number;
    private readonly _timestamp: Date;

    constructor(id: number, accountId: number, categoryId: number, budgetId: number, payee: string, description: string, amount: number, timestamp: Date) {
        this._id = id;
        this._accountId = accountId;
        this._categoryId = categoryId;
        this._budgetId = budgetId;
        this._payee = payee;
        this._description = description;
        this._amount = amount;
        this._timestamp = timestamp;
    }

    get id(): number {
        return this._id;
    }

    get accountId(): number {
        return this._accountId;
    }

    get categoryId(): number {
        return this._categoryId;
    }

    get budgetId(): number {
        return this._budgetId;
    }

    get payee(): string {
        return this._payee;
    }

    get description(): string {
        return this._description;
    }

    get amount(): number {
        return this._amount;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    toJSON() {
        return {
            id: this.id,
            account_id: this.accountId,
            category_id: this.categoryId,
            budget_id: this.budgetId,
            payee: this.payee,
            description: this.description,
            amount: this.amount,
            timestamp: this.timestamp.getTime()
        };
    }
}