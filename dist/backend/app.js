"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
const express_1 = __importDefault(require("express"));
const Router_1 = require("./Router");
const app = express_1.default();
const router = new Router_1.Router(app, '/api');
const server = new Server_1.Server(app, router);
const PORT = 4000;
server.start(PORT);
