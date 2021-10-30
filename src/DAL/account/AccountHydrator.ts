import Account from "./Account";

export default class AccountHydrator {
    static hydrate(raw: { id: number, name: string, userId: number }): Account {
        const {
            id,
            name,
            userId
        } = raw;

        return new Account(id, name, userId);
    }

    static dehydrate(account: Account): { id: number, name: string, userId: number } {
        return account.toJSON();
    }
}