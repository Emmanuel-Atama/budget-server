import CategoryGroup from "../../DAL/categoryGroup/CategoryGroup";
import EntityCommand from "../EntityCommand";

export default class CreateCategoryGroup implements EntityCommand {
    private readonly _categoryGroup: CategoryGroup;

    constructor(categoryGroup: CategoryGroup) {
        this._categoryGroup = categoryGroup;
    }

    get entity(): CategoryGroup {
        return this._categoryGroup;
    }

    getName(): string {
        return 'CreateCategoryGroup';
    }
}
