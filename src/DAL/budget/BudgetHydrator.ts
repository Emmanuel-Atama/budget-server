import Budget from "./Budget";

export default class BudgetHydrator {
    static hydrate(raw: { id: number, userId: number, yearMonth: number }): Budget {
        const {
            id,
            userId,
            yearMonth
        } = raw;

        return new Budget(id, userId, yearMonth);
    }

    static dehydrate(budget: Budget): { id: number, userId: number, yearMonth: number } {
        return budget.toJSON();
    }
}
