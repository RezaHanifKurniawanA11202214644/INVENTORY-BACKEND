const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Menambahkan route untuk membuat kategori baru
router.post('/', categoryController.createCategory);

// Menambahkan route untuk mendapatkan semua kategori
router.get('/', categoryController.getCategories);

module.exports = router;
