const express = require('express');
const { saveGameData, getHistory } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);

// Route to get games history
router.get('/history', getHistory);

module.exports = router;
