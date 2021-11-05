import CreateBudget from "../command/budget/CreateBudget";
import CreateCategory from "../command/category/CreateCategory";
import CreateCategoryGroup from "../command/categoryGroup/CreateCategoryGroup";
import CommandBus from "../command/CommandBus";
import Budget from "../DAL/budget/Budget";
import Category from "../DAL/category/Category";
import CategoryGroup from "../DAL/categoryGroup/CategoryGroup";

export default class BudgetInitializer {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    async init(userId: number, ): Promise<{ budget: Budget, incomeCategory: Category | null, createdCategories: { group: CategoryGroup, categories: Category[] }[] }> {
        const today = new Date();
        const yearMonth = parseInt(`${today.getFullYear()}${today.getMonth()}`);

        const budget = await this.commandBus.dispatch(new CreateBudget(new Budget(0, userId, yearMonth)));

        const groups = this.getDefaultCategoryGroups(budget.id);
        let incomeCategory: Category | null = null;
        let createdCategories: { group: CategoryGroup, categories: Category[] }[] = [];

        let i = groups.length;
        while (i --> 0) {
            const createdGroup = await this.commandBus.dispatch(new CreateCategoryGroup(groups[i][0]));
            const categoryCreation: { group: CategoryGroup, categories: Category[] } = {
                group: createdGroup,
                categories: []
            };

            let j = groups[i][1].length;
            console.log('before while', j);
            while (j --> 0) {
                console.log('in while', j);
                console.log(groups[i][1]);
                const categoryName = groups[i][1][j].name;
                const createdCategory = await this.commandBus.dispatch(new CreateCategory(new Category(0, categoryName, 0, createdGroup.id)));
                categoryCreation.categories.push(createdCategory);

                if (categoryName === 'Ready to Assign') {
                    incomeCategory = createdCategory;
                }
            }

            createdCategories.push(categoryCreation);
        }

        return {
            budget,
            incomeCategory,
            createdCategories
        }
    }

    private getDefaultCategoryGroups(budgetId: number): [CategoryGroup, { name: string }[]][] {
        return [
            [
                new CategoryGroup(0, 'Fun', budgetId),
                [{ name: 'Dates' },{ name: 'Family' }]
            ],
            [
                new CategoryGroup(0, 'Savings & Investments', budgetId),
                [{ name: 'Stocks & Shares ISA' },{ name: 'Crypto' },{ name: 'Safety Net' },{ name: 'Pension' }]
            ],
            [
                new CategoryGroup(0, 'Debts', budgetId),
                [{ name: 'Car Payment' },{ name: 'Credit' },{ name: 'Loans' }]
            ],
            [
                new CategoryGroup(0, 'Non-essential', budgetId),
                [{ name: 'Gifts' },{ name: 'Subscriptions' },{ name: 'Streaming Services' },{ name: 'Phones' }]
            ],
            [
                new CategoryGroup(0, 'Priority', budgetId),
                [{ name: 'Insurance' },{ name: 'Internet' },{ name: 'Groceries' },{ name: 'Water' },{ name: 'Energy' },{ name: 'Council Tax' },{ name: 'Rent' },]
            ],
            [
                new CategoryGroup(0, 'Income', budgetId),
                [{ name: 'Ready to Assign' }]
            ]
        ];
    }
}