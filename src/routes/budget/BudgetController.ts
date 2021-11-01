import { Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import CreateBudget from "../../command/budget/CreateBudget";
import CommandBus from "../../command/CommandBus";
import Budget from "../../DAL/budget/Budget";

export default class BudgetController {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (!req.user?.id) {
                res.status(403).json({ error: 'Unable to authenticate the token provided for the user.' });
                return;
            }

            const today = new Date();
            // todo Budget ID won't work like this if there is more than 1 user, need a better approach
            const budgetToCreate = new Budget(parseInt(`${today.getFullYear()}${today.getMonth()}`), req.user.id);

            await this.commandBus.dispatch(new CreateBudget(budgetToCreate));
        
            res.status(200).json({ message: "Budget created!" });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                error: 'Something went wrong when creating the budget.'
            });
        }
    }
}