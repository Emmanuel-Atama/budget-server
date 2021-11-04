import Category from "./Category";

export default class CategoryHydrator {
    static hydrate(raw: { id: number, name: string, amount: number, categoryGroupId: number }): Category {
        const {
            id,
            name,
            amount,
            categoryGroupId
        } = raw;

        return new Category(id, name, amount, categoryGroupId);
    }

    static dehydrate(category: Category): { id: number, name: string, amount: number, categoryGroupId: number } {
        return category.toJSON();
    }
}