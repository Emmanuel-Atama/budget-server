import { Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import CreateBudget from "../../command/budget/CreateBudget";
import CommandBus from "../../command/CommandBus";
import Budget from "../../DAL/budget/Budget";
import Category from "../../DAL/category/Category";
import CategoryGroup from "../../DAL/categoryGroup/CategoryGroup";

export default class BudgetController {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    async initializeBudget(req: AuthenticatedRequest, res: Response): Promise<void> {
        const user = req.user;

        if (typeof user === 'undefined') {
            res.status(403).json({ error: 'Not authorized.' });
            return;
        }

        const {
            accounts, // @Object<{ name: @String, startingBalance: @Number }>[]
            categoryGroups, // @Object<{ name: @String, categories: @Object<{ name: @String }>[] }>[]
        } = req.body;

        const today = new Date();
        const yearMonth = parseInt(`${today.getFullYear()}${today.getMonth()}`);

        // Create budget using user.id and yearMonth
        const budget = await this.commandBus.dispatch(new CreateBudget(new Budget(0, user.id, yearMonth)));

        categoryGroups.forEach((categoryGroup: { name: string, categories: [{ name: string }] }) => {
            // Create the default CategoryGroup's and Category's using the created budget's ID
            // Set category amounts to 0
        });
            
        accounts.forEach((account: { name: string, startingBalance: number }) => {
            // Create each account in the accounts array using the created budget's ID
            // Using the startingBalance on each account object, create an initial transaction of > 0
        });
    }

    async create(req: AuthenticatedRequest, res: Response): Promise<void> {
        const { yearMonth } = req.body;

        try {
            if (!req.user?.id) {
                res.status(403).json({ error: 'Unable to authenticate the token provided for the user.' });
                return;
            }

            const budgetToCreate = new Budget(0, req.user.id, yearMonth);

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