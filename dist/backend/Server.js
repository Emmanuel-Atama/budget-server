"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    constructor(app, router) {
        this.app = app;
        this.router = router;
    }
    start(port) {
        this.router.initializeRoutes();
        this.app.listen(port, () => console.log(`API server listening on port ${port}`));
    }
}
exports.Server = Server;
