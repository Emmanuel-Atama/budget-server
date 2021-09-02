"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 4000;
const server = new Server_1.Server(app);
server.start(PORT);
