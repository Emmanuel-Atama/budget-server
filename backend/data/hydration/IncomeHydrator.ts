import Income from "../../model/Income";

export default class IncomeHydrator {
    static hydrate(raw: { id: number, source: string, amount: number, timestamp: Date }): Income {
        const {
            id,
            source,
            amount,
            timestamp
        } = raw;

        return new Income(id, source, amount, timestamp);
    }

    static dehydrate(income: Income): { id: number, source: string, amount: number, timestamp: Date } {
        return income.toJSON();
    }
}