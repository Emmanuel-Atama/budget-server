import { Expense } from "../../model/Expense";

export class ExpenseHydrator {
    static hydrate(raw: { id: number, name: string, source: string, amount: number, timestamp: Date }): Expense {
        const {
            id,
            name,
            source,
            amount,
            timestamp
        } = raw;

        return new Expense(id, name, source, amount, timestamp);
    }

    static dehydrate(expense: Expense): { id: number, name: string, source: string, amount: number, timestamp: Date } {
        return expense.toJSON();
    }
}