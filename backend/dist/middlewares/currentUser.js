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
exports.decodeToken = void 0;
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const decodeToken = (encodedToken, callback) => {
    jsonwebtoken_1.default.verify(encodedToken, process.env.JWT_SECRET, callback);
};
exports.decodeToken = decodeToken;
function default_1(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    if (tokenHeader) {
        const [, token] = tokenHeader.split(' ');
        (0, exports.decodeToken)(token, function (err, decoded) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log('Invalid token');
                    return res.status(403).json({ message: 'Invalid token' });
                }
                else {
                    const user = yield user_1.default.findById(decoded.id);
                    req.currentUser = user;
                    next();
                }
            });
        });
    }
    else {
        next();
    }
}
