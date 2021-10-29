import Token from "./Token";

export default class TokenHydrator {
    static hydrate(raw: { id: number, jwt: string, userId: number }): Token {
        const {
            id,
            jwt,
            userId
        } = raw;

        return new Token(id, jwt, userId);
    }

    static dehydrate(token: Token): { id: number, jwt: string, userId: number } {
        return token.toJSON();
    }
}