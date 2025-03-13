"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saveSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    gameDate: { type: Date, required: true, default: Date.now },
    failed: { type: Number, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Normal', 'Hard'],
    },
    completed: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
});
exports.default = mongoose_1.default.model('Save', saveSchema);
