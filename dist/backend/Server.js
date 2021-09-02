"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Router_1 = require("./Router");
class Server {
    constructor(app) {
        this.app = app;
        this.router = new Router_1.Router(this.app, '/api');
    }
    start(port) {
        this.router.initializeRoutes();
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}
exports.Server = Server;
