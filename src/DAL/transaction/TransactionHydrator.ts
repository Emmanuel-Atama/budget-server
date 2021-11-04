import Transaction from "./Transaction";

export default class TransactionHydrator {
    static hydrate(raw: { id: number, accountId: number, categoryId: number, payee: string, description: string, amount: number, timestamp: Date }): Transaction {
        const {
            id,
            accountId,
            categoryId,
            payee,
            description,
            amount,
            timestamp
        } = raw;

        return new Transaction(id, accountId, categoryId, payee, description, amount, timestamp);
    }

    static dehydrate(transaction: Transaction): { id: number, accountId: number, categoryId: number, payee: string, description: string, amount: number, timestamp: Date } {
        return transaction.toJSON();
    }
}