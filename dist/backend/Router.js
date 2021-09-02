"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class Router {
    constructor(app) {
        this.app = app;
    }
    initializeRoutes(apiUrl) {
        this.app.use(express_1.default.static(`${path_1.default.resolve('./')}/dist/frontend`));
        this.app.get(apiUrl, (req, res, next) => {
            res.send('This is the API\'s base URL!');
        });
        this.app.get('*', (req, res) => {
            res.sendFile(`${path_1.default.resolve("./")}/dist/frontend/index.html`);
        });
    }
}
exports.Router = Router;
