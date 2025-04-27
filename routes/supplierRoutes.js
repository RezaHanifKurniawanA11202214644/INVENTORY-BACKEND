const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Menambahkan route untuk membuat supplier baru
router.post('/', supplierController.createSupplier);

// Menambahkan route untuk mendapatkan semua supplier
router.get('/', supplierController.getSuppliers);

module.exports = router;
