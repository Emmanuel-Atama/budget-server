import Token from "./Token";

export default class TokenHydrator {
    static hydrate(raw: { id: number, token: string, userId: number }): Token {
        const {
            id,
            token,
            userId
        } = raw;

        return new Token(id, token, userId);
    }

    static dehydrate(token: Token): { id: number, token: string, userId: number } {
        return token.toJSON();
    }
}