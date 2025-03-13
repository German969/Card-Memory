import express from 'express';
import { saveGameData, getHistory } from '../controllers/memoryController';

const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);

// Route to get games history
router.get('/history', getHistory);

export default router;
