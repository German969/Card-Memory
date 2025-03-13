"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const memoryController_1 = require("../controllers/memoryController");
const router = express_1.default.Router();
// Route to save game data
router.post('/save', memoryController_1.saveGameData);
// Route to get games history
router.get('/history', memoryController_1.getHistory);
exports.default = router;
