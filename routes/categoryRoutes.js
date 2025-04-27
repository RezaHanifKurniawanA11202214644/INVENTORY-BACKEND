const express = require('express');
const router = express.Router();
const { getOrCreateCategory,  allCategoriesSummary} = require('../controllers/categoryController');

// Routes untuk kategori
router.route('/')
  .post(getOrCreateCategory)   // Menambah kategori baru (POST)
  .get(getOrCreateCategory);   // Mengambil semua kategori (GET)

// Routes untuk menampilkan barang berdasarkan kategori
router.get('/percategori-summaryall', allCategoriesSummary);

module.exports = router;
