"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const memoryRoutes_1 = __importDefault(require("./routes/memoryRoutes"));
const currentUser_1 = __importDefault(require("./middlewares/currentUser"));
const auth_1 = __importDefault(require("./middlewares/auth"));
// Load environment variables
dotenv_1.default.config();
// Check if MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env');
    process.exit(1);
}
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Allow cross-origin requests
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Current User Middleware
app.use(currentUser_1.default);
// Routes
// Public Routes
app.use('/api/users', userRoutes_1.default);
// Authenticated Routes
app.use('/api/memory', auth_1.default, memoryRoutes_1.default);
// Connect to MongoDB
(0, database_1.default)();
// Default Route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});
// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = server;
