import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import memoryRoutes from './routes/memoryRoutes';
import currentUser from './middlewares/currentUser';
import auth from './middlewares/auth';

// Load environment variables
dotenv.config();

// Check if MONGODB_URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Current User Middleware
app.use(currentUser);

// Routes
// Public Routes
app.use('/api/users', userRoutes);

// Authenticated Routes
app.use('/api/memory', auth, memoryRoutes);


// Connect to MongoDB
connectDB();

// Default Route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
