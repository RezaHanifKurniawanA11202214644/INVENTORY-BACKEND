const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Ringkasan Stok
router.get('/stock-summary', inventoryController.getStockSummary);

// Daftar Barang dengan Stok Di Bawah Ambang Batas
router.get('/low-stock', inventoryController.getLowStockItems);

// Laporan Barang Berdasarkan Kategori
router.get('/items/category/:categoryId', inventoryController.getItemsByCategory);

// Ringkasan Per Kategori
router.get('/category-summary', inventoryController.getCategorySummary);

// Ringkasan Barang Berdasarkan Pemasok
router.get('/supplier-summary', inventoryController.getSupplierSummary);

// Ringkasan Keseluruhan Sistem
router.get('/system-summary', inventoryController.getSystemSummary);

module.exports = router;
