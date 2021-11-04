import Category from "../../DAL/category/Category";
import EntityCommand from "../EntityCommand";

export default class CreateCategory implements EntityCommand {
    private readonly _category: Category;

    constructor(category: Category) {
        this._category = category;
    }

    get entity(): Category {
        return this._category;
    }

    getName(): string {
        return 'CreateCategory';
    }
}
