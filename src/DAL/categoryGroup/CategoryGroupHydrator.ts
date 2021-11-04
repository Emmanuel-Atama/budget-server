import CategoryGroup from "./CategoryGroup";

export default class CategoryGroupHydrator {
    static hydrate(raw: { id: number, name: string, budgetId: number }): CategoryGroup {
        const {
            id,
            name,
            budgetId
        } = raw;

        return new CategoryGroup(id, name, budgetId);
    }

    static dehydrate(categoryGroup: CategoryGroup): { id: number, name: string, budgetId: number } {
        return categoryGroup.toJSON();
    }

    static defaultGroups(budgetId: number): CategoryGroup[] {
        return [
            new CategoryGroup(0, 'Priority Expenses', budgetId),
            new CategoryGroup(0, 'Debts', budgetId),
            new CategoryGroup(0, 'Savings & Investments', budgetId),
            new CategoryGroup(0, 'Fun', budgetId)
        ];
    }
}