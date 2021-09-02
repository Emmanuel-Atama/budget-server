"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeConnection = void 0;
const IncomeHydrator_1 = require("./hydration/IncomeHydrator");
class IncomeConnection {
    constructor(dbClient) {
        this.dbClient = dbClient;
    }
    create(income) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.income.create({
                data: Object.assign(Object.assign({}, IncomeHydrator_1.IncomeHydrator.dehydrate(income)), { id: undefined, timestamp: undefined })
            });
        });
    }
    update(income) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.income.update({
                where: { id: income.id },
                data: Object.assign(Object.assign({}, IncomeHydrator_1.IncomeHydrator.dehydrate(income)), { id: undefined, timestamp: undefined })
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbClient.income.delete({
                where: { id }
            });
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield this.dbClient.income.findFirst({
                where: { id }
            });
            if (raw) {
                return IncomeHydrator_1.IncomeHydrator.hydrate(raw);
            }
            return null;
        });
    }
    getMany(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield this.dbClient.income.findMany({
                take: limit
            });
            return raw.map(data => IncomeHydrator_1.IncomeHydrator.hydrate(data));
        });
    }
}
exports.IncomeConnection = IncomeConnection;
