const express = require('express');
const router = express.Router();
const { getOrCreateAdmin } = require('../controllers/adminController');

// Routes untuk admin
router.route('/')
  .post(getOrCreateAdmin)   // Menambah admin baru (POST)
  .get(getOrCreateAdmin);   // Mengambil semua admin (GET)

module.exports = router;
