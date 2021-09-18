import { User } from "../../model/User";

export class UserHydrator {
    static hydrate(raw: { id: number, username: string, password: string, timestamp: Date }): User {
        const {
            id,
            username,
            password,
            timestamp
        } = raw;

        return new User(id, username, password, timestamp);
    }

    static dehydrate(user: User): { id: number, username: string, password: string, timestamp: Date } {
        return user.toJSON();
    }
}