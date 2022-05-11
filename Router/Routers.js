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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_1 = __importDefault(require("../Models/player"));
const multer_1 = __importDefault(require("multer"));
const route = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield player_1.default.find();
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
}));
route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //rushingyards,touchdowns,sacks,madeGoals,missedGoals,catches,
    // const {firstname,lastname,dob,position,salary,rushingyards,touchdowns,sacks,madeGoals,missedGoals,catches,
    // }=JSON.parse(req.body.data);
    try {
        const PlayerModel = new player_1.default(req.body.data);
        const newPlayer = yield PlayerModel.save();
        res.json(newPlayer);
        console.log(newPlayer);
    }
    catch (error) {
        console.log("Error: " + error);
        res.json(error);
    }
}));
route.put('/:id', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstname, lastname, dob, position, salary } = JSON.parse(req.body.data);
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const PlayerModel = { firstname, lastname, dob, position, salary, image };
        const newPlayer = yield player_1.default.updateOne({ _id: req.params.id }, PlayerModel);
        res.json(newPlayer);
    }
    catch (error) {
        console.log("Error: " + error);
        res.json(error);
    }
}));
route.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield player_1.default.remove();
        res.json({ message: "successful" });
    }
    catch (err) {
        res.status(500).json({ err });
    }
}));
exports.default = route;
