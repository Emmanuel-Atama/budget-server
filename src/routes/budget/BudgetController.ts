import { Response } from "express";
import AuthenticatedRequest from "../../auth/AuthenticatedRequest";
import CreateAccount from "../../command/account/CreateAccount";
import CreateBudget from "../../command/budget/CreateBudget";
import CreateCategory from "../../command/category/CreateCategory";
import CreateCategoryGroup from "../../command/categoryGroup/CreateCategoryGroup";
import CommandBus from "../../command/CommandBus";
import Account from "../../DAL/account/Account";
import Budget from "../../DAL/budget/Budget";
import Category from "../../DAL/category/Category";
import CategoryGroup from "../../DAL/categoryGroup/CategoryGroup";
import Transaction from "../../DAL/transaction/Transaction";

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

        const categoriesForGroups: { groupName: string, categories: { name: string }[]}[] = [];
        const groupProms: Promise<CategoryGroup>[] = categoryGroups.map((categoryGroup: { name: string, categories: { name: string }[] }) => {
            categoriesForGroups.push({ groupName: categoryGroup.name, categories: categoryGroup.categories });
            return this.commandBus.dispatch(new CreateCategoryGroup(new CategoryGroup(0, categoryGroup.name, budget.id)));
        });

        const groups: CategoryGroup[] = await Promise.all(groupProms);

        let categoryProms: Promise<Category>[] = []
        groups.forEach((group: CategoryGroup) => {
            const g = categoriesForGroups.find((cg => cg.groupName === group.name));
            g?.categories.forEach(cat => {
                categoryProms = [...categoryProms, this.commandBus.dispatch(new CreateCategory(new Category(0, cat.name, 0, group.id)))]
            });
        });

        await Promise.all(categoryProms);

        const accountProms: Promise<Account>[] = accounts.map((account: { name: string, startingBalance: number }) => {
            return this.commandBus.dispatch(new CreateAccount(new Account(0, account.name, budget.id)));
        });
        const createdAccounts = await Promise.all(accountProms);

        let transactionProms: Promise<Transaction>[];
        createdAccounts.forEach((createdAccount: Account) => {
            const a = accounts.find(acc => acc.name === createdAccount.name);
            // Append create transaction promises using a.startingBalance if > 0
            if (a.startingBalance > 0) {
                // transactionProms = [...transactionProms, ]
            }
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