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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const save_1 = __importDefault(require("../models/save"));
const user_1 = __importDefault(require("../models/user"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server_1.default.close();
    yield mongoose_1.default.connection.close();
}));
describe("POST /api/memory/save", () => {
    it("Should save game", () => __awaiter(void 0, void 0, void 0, function* () {
        // Register user
        yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        // Login user
        const loginRes = yield (0, supertest_1.default)(server_1.default).post("/api/users/login").send({
            username: 'testUser',
            password: 'test123'
        });
        const res = yield (0, supertest_1.default)(server_1.default)
            .post("/api/memory/save")
            .set('authorization', 'Bearer ' + loginRes.body.token)
            .send({
            gameDate: new Date(),
            failed: 0,
            difficulty: 'Easy',
            completed: 1,
            timeTaken: 5,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Game data saved successfully');
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
        // Delete save
        yield save_1.default.deleteMany({ userID: loginRes.body.userID });
    }));
    it("Should get history", () => __awaiter(void 0, void 0, void 0, function* () {
        // Register user
        yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        // Login user
        const loginRes = yield (0, supertest_1.default)(server_1.default).post("/api/users/login").send({
            username: 'testUser',
            password: 'test123'
        });
        yield (0, supertest_1.default)(server_1.default)
            .post("/api/memory/save")
            .set('authorization', 'Bearer ' + loginRes.body.token)
            .send({
            gameDate: new Date(),
            failed: 0,
            difficulty: 'Easy',
            completed: 1,
            timeTaken: 5,
        });
        const res = yield (0, supertest_1.default)(server_1.default)
            .get("/api/memory/history")
            .set('authorization', 'Bearer ' + loginRes.body.token);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
        // Delete save
        yield save_1.default.deleteMany({ userID: loginRes.body.userID });
    }));
});
