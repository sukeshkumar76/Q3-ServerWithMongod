"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Routers_1 = __importDefault(require("./Router/Routers"));
//connect to db
mongoose_1.default.connect('mongodb://127.0.0.1:27017/footballteam');
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error("db error" + error));
db.once('open', () => console.log("db connectd"));
//import multer from 'multer'
const App = (0, express_1.default)();
App.use((0, cors_1.default)());
App.use(express_1.default.json());
//routs
App.use("/", Routers_1.default);
const port = process.env.PORT || 2000;
App.listen(port, () => {
    console.log(`listening at port ${port}`);
});
