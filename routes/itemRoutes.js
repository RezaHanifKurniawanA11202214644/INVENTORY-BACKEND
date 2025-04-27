const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Menambahkan route untuk membuat item baru
router.post('/', itemController.createItem);

// Menambahkan route untuk mendapatkan semua item
router.get('/', itemController.getItems);

module.exports = router;
