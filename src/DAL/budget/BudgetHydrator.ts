import Budget from "./Budget";

export default class BudgetHydrator {
    static hydrate(raw: { id: number, userId: number }): Budget {
        const {
            id,
            userId
        } = raw;

        return new Budget(id, userId);
    }

    static dehydrate(budget: Budget): { id: number, userId: number } {
        return budget.toJSON();
    }
}
