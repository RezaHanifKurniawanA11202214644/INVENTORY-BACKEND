const express = require('express');
const router = express.Router();
const { getOrCreateItem, lowStockItems, categorySummary, systemSummary } = require('../controllers/itemController');

// Routes untuk item
router.route('/')
  .post(getOrCreateItem)  // Menambah item baru (POST)
  .get(getOrCreateItem);  // Mengambil semua item (GET) Ringkasan stok barang


// Routes untuk menampilkan barang dengan stok rendah
router.get('/low-stock', lowStockItems);  // Barang dengan stok rendah ambang batas 5

// Routes untuk menampilkan ringkasan per kategori
router.get('/:categoryId/category-byid-summary', categorySummary);  // Menampilkan ringkasan kategori berdasarkan categoryId

// Routes untuk menampilkan ringkasan keseluruhan sistem
router.get('/system-summary', systemSummary);  // Ringkasan keseluruhan sistem

module.exports = router;
