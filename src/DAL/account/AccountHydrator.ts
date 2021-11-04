import Account from "./Account";

export default class AccountHydrator {
    static hydrate(raw: { id: number, name: string, budgetId: number }): Account {
        const {
            id,
            name,
            budgetId
        } = raw;

        return new Account(id, name, budgetId);
    }

    static dehydrate(account: Account): { id: number, name: string, budgetId: number } {
        return account.toJSON();
    }
}