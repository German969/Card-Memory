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
exports.getHistory = exports.saveGameData = void 0;
const save_1 = __importDefault(require("../models/save"));
const saveGameData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;
    console.log('Received data to save:', req.body);
    try {
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSave = new save_1.default({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });
        yield newSave.save();
        res.status(201).json({ message: 'Game data saved successfully' });
    }
    catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
});
exports.saveGameData = saveGameData;
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userHistory = yield save_1.default.find({
        userID: req.currentUser._id,
    }).sort({
        gameDate: -1
    });
    res.status(200).json(userHistory);
});
exports.getHistory = getHistory;
