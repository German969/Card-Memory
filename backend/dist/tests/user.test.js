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
const user_1 = __importDefault(require("../models/user"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    server_1.default.close();
    yield mongoose_1.default.connection.close();
}));
describe('POST /api/users/register', () => {
    it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
    }));
    it("should return error with existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Username already exists");
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
    }));
    it("should return error with invalid payload", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
        });
        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Error registering user");
    }));
});
describe('POST /api/users/login', () => {
    it("should return token and userID", () => __awaiter(void 0, void 0, void 0, function* () {
        // Preset
        yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/login").send({
            username: 'testUser',
            password: 'test123'
        });
        const user = yield user_1.default.findOne({ username: 'testUser' });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.userID).toBe(user._id.toString());
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
    }));
    it("should return error if user not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/login").send({
            username: 'testUser',
            password: 'test123'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid username or password');
    }));
    it("should return error if password not match", () => __awaiter(void 0, void 0, void 0, function* () {
        // Preset
        yield (0, supertest_1.default)(server_1.default).post("/api/users/register").send({
            username: 'testUser',
            password: 'test123'
        });
        const res = yield (0, supertest_1.default)(server_1.default).post("/api/users/login").send({
            username: 'testUser',
            password: 'invalid'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid username or password');
        // Cleanup
        yield user_1.default.deleteOne({ username: 'testUser' });
    }));
});
