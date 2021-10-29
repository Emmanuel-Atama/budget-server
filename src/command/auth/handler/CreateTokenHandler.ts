import CommandHandler from "../../CommandHandler";
import CreateToken from "../CreateToken";
import jwt from 'jsonwebtoken';

export default class CreateTokenHandler implements CommandHandler {
    handle(command: CreateToken): Promise<any> {
        const user = {
            id: command.user.id,
            username: command.user.username
        };

        // todo Check if there's already a valid token for a user
        // If there is, throw a custom error

        jwt.sign({ user }, 'mysecretkey', { expiresIn: '20s' }, (error, token) => {
            // todo save token to database

            if (error) {
                throw 'Forbidden';
            }
        });

        return new Promise(resolve => resolve(null));
    }
}