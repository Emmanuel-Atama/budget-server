import Transaction from "../../DAL/transaction/Transaction";
import EntityCommand from "../EntityCommand";

export default class CreateTransaction implements EntityCommand {
    private readonly _transaction: Transaction;

    constructor(transaction: Transaction) {
        this._transaction = transaction;
    }

    get entity(): Transaction {
        return this._transaction;
    }

    getName(): string {
        return 'CreateTransaction';
    }
}
