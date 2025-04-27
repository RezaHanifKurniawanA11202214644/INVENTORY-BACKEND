const express = require('express');
const router = express.Router();
const { getOrCreateSupplier, supplierSummary } = require('../controllers/supplierController');

// Routes untuk supplier
router.route('/')
  .post(getOrCreateSupplier)  // Menambah supplier baru (POST)
  .get(getOrCreateSupplier);  // Mengambil semua supplier (GET)

// Routes untuk menampilkan ringkasan barang yang disuplai oleh masing-masing pemasok
router.get('/supplier-summary', supplierSummary);  // Ringkasan barang yang disuplai oleh pemasok

module.exports = router;
