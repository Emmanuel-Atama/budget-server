import { Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import CreateAccount from "../../command/account/CreateAccount";
import GetAccountsByUserId from "../../command/account/GetAccountsByUsername";
import CommandBus from "../../command/CommandBus";
import GetUserById from "../../command/user/GetUserById";
import Account from "../../DAL/account/Account";

export default class AccountController {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
        if (req.user?.id) {
            const accounts = await this.commandBus.dispatch(new GetAccountsByUserId(req.user?.id));

            const accountsToSend = accounts.map((account: Account) => {
                return {
                    ...account.toJSON(),
                    userId: undefined
                };
            })

            res.json({ accounts: accountsToSend });
            
            return;
        }
        
        res.status(403).json({ error: 'Unable to authenticate the token provided for the user.' });
    }

    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        const {
            name
        } = req.body;

        try {
            if (!req.user?.id) {
                res.status(403).json({ error: 'Unable to authenticate the token provided for the user.' });
                return;
            }

            const user = await this.commandBus.dispatch(new GetUserById(req.user?.id));
        
            const accountToCreate = new Account(0, name, user.id);
            
            await this.commandBus.dispatch(new CreateAccount(accountToCreate));
            res.status(200);
        } catch (e) {
            console.error(e);
            res.status(500).json({
                error: 'Something went wrong when creating the account.'
            });
        }
    }
}